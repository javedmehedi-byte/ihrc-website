
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { isPublished } = await request.json();
  const item = await db.resultSession.update({ where: { id }, data: { isPublished } });
  return NextResponse.json(item);
}
