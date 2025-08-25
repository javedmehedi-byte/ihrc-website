import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const bySlug = await db.notice.findUnique({ where: { slug: id } });
  if (bySlug) return NextResponse.json(bySlug);
  const byId = await db.notice.findUnique({ where: { id } });
  if (byId) return NextResponse.json(byId);
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  const data = await request.json();
  const item = await db.notice.update({ where: { id }, data });
  return NextResponse.json(item);
}

export async function DELETE(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });

  await db.notice.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
