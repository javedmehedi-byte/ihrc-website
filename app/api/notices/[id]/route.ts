import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export async function GET(_: Request, { params }: { params: { id: string }}) {
  const bySlug = await db.notice.findUnique({ where: { slug: params.id } });
  if (bySlug) return NextResponse.json(bySlug);
  const byId = await db.notice.findUnique({ where: { id: params.id } });
  if (byId) return NextResponse.json(byId);
  return NextResponse.json({ error: "Not found" }, { status: 404 });
}

export async function PUT(req: Request, { params }: { params: { id: string }}) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const data = await req.json();
  const item = await db.notice.update({ where: { id: params.id }, data });
  return NextResponse.json(item);
}

export async function DELETE(_: Request, { params }: { params: { id: string }}) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  await db.notice.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
