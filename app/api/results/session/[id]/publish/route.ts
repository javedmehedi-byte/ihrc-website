import { NextResponse } from "next/server";

export async function PUT() {
  return NextResponse.json({ error: "Results endpoint removed" }, { status: 410 });
}
