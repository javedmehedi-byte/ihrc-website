import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

// Ensure Node runtime for crypto/fs/nodemailer
export const runtime = "nodejs";

export async function POST(req: Request) {
  const body = await req.json();
  const razorpaySignature = req.headers.get("x-razorpay-signature");

  // Verify Razorpay signature using Webhook Secret (not API key secret)
  const { createHmac } = await import("crypto");
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  if (!webhookSecret) {
    return NextResponse.json({ error: "Missing webhook secret" }, { status: 500 });
  }
  const generatedSignature = createHmac("sha256", webhookSecret)
    .update(JSON.stringify(body))
    .digest("hex");

  if (razorpaySignature !== generatedSignature) {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Process payment event
  if (body.event === "payment.captured") {
    const paymentDetails = body.payload.payment.entity;

    const receiptData = {
      paymentId: paymentDetails.id,
      amount: paymentDetails.amount / 100, // Convert from paise to INR
      currency: paymentDetails.currency,
      courseName: paymentDetails.notes.courseName,
      candidateName: paymentDetails.notes.candidateName,
      enrollmentNumber: paymentDetails.notes.enrollmentNumber,
      semester: paymentDetails.notes.semester,
      date: new Date(paymentDetails.created_at * 1000).toLocaleString(),
    };

    // Generate receipt as a PDF or text file
  // Use /tmp in serverless; process.cwd() is read-only in Vercel runtime
  const baseDir = process.env.NODE_ENV === "production" ? "/tmp" : process.cwd();
  const receiptPath = path.join(baseDir, "receipts", `receipt_${receiptData.paymentId}.txt`);
    if (!fs.existsSync(path.dirname(receiptPath))) {
      fs.mkdirSync(path.dirname(receiptPath), { recursive: true });
    }

    const receiptContent = `
      IHRC Paramedical College - Payment Receipt
      ------------------------------------------
      Payment ID: ${receiptData.paymentId}
      Candidate Name: ${receiptData.candidateName}
      Enrollment Number: ${receiptData.enrollmentNumber}
      Course Name: ${receiptData.courseName}
      Semester: ${receiptData.semester}
      Amount Paid: ₹${receiptData.amount} ${receiptData.currency}
      Payment Date: ${receiptData.date}
      ------------------------------------------
      Thank you for your payment!
    `;

    fs.writeFileSync(receiptPath, receiptContent);

    // Send receipt via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: paymentDetails.email,
        subject: "Payment Receipt - IHRC Paramedical College",
        text: receiptContent,
        attachments: [
          {
            filename: `receipt_${receiptData.paymentId}.txt`,
            path: receiptPath,
          },
        ],
      });

      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL,
        subject: "Payment Notification - IHRC Paramedical College",
        text: `A payment has been successfully processed.\n\n${receiptContent}`,
      });

      return NextResponse.json({ message: "Receipt generated and emailed successfully!" });
    } catch (error) {
      console.error("Failed to send email:", error);
      return NextResponse.json({ error: "Failed to send receipt email" }, { status: 500 });
    }
  }

  return NextResponse.json({ message: "Event processed successfully!" });
}