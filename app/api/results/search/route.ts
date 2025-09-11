import { NextResponse } from "next/server";

// Results feature removed. Return 410 Gone to indicate the endpoint is deprecated.
export async function GET() {
  return NextResponse.json({ error: "Results endpoint removed" }, { status: 410 });
}
