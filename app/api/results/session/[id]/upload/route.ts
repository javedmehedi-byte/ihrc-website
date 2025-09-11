import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ error: "Results endpoint removed" }, { status: 410 });
}
