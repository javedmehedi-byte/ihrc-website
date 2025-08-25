import { NextResponse } from "next/server";
import Razorpay from "razorpay";

// Ensure this route runs on Node.js runtime (not Edge), required for Razorpay SDK
export const runtime = "nodejs";

export async function POST(req: Request) {
  const { courseName, candidateName, enrollmentNumber, semester, feeAmount } = await req.json();

  if (!courseName || !candidateName || !enrollmentNumber || !semester || feeAmount == null) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const key_id = process.env.RAZORPAY_KEY_ID;
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (!key_id || !key_secret) {
    console.error("RAZORPAY env vars missing");
    return NextResponse.json({ error: "Payment gateway not configured" }, { status: 500 });
  }

  const razorpay = new Razorpay({ key_id, key_secret });

  const amountPaise = Math.round(Number(feeAmount) * 100);
  if (!Number.isFinite(amountPaise) || amountPaise <= 0) {
    return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
  }

  const paymentOptions = {
    amount: amountPaise,
    currency: "INR" as const,
    receipt: `receipt_${Date.now()}`,
    notes: { courseName, candidateName, enrollmentNumber, semester },
  };

  try {
    const order = await razorpay.orders.create(paymentOptions);
    return NextResponse.json({
      success: true,
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || key_id,
    });
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}