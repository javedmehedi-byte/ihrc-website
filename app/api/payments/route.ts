import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const payments = await db.payment.findMany({
      orderBy: { created_at: "desc" }, // Sort payments by creation date
    });
    return NextResponse.json({ payments });
  } catch (error) {
    // Safely handle the error
    if (error instanceof Error) {
      console.error("Failed to fetch payment records:", error.message, error.stack);
      return NextResponse.json(
        { payments: null, error: "Failed to fetch payment records" },
        { status: 500 }
      );
    } else {
      console.error("Unknown error occurred:", error);
      return NextResponse.json(
        { payments: null, error: "An unknown error occurred" },
        { status: 500 }
      );
    }
  }
}