import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: Request) {
  const { courseName, candidateName, enrollmentNumber, semester, feeAmount } = await req.json();

  if (!courseName || !candidateName || !enrollmentNumber || !semester || !feeAmount) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
  });

  const paymentOptions = {
    amount: feeAmount * 100, // Convert to paise
    currency: "INR",
    receipt: `receipt_${Date.now()}`,
    notes: {
      courseName,
      candidateName,
      enrollmentNumber,
      semester,
    },
  };

  try {
    const payment = await razorpay.orders.create(paymentOptions);
    return NextResponse.json({ success: true, paymentUrl: `https://checkout.razorpay.com/v1/checkout.js?order_id=${payment.id}` });
  } catch (error) {
    console.error("Failed to create Razorpay order:", error);
    return NextResponse.json({ error: "Failed to initiate payment" }, { status: 500 });
  }
}