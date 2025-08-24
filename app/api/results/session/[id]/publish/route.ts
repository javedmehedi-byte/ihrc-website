import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: { id: string }}) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { isPublished } = await req.json();
  const item = await db.resultSession.update({ where: { id: params.id }, data: { isPublished } });
  return NextResponse.json(item);
}
