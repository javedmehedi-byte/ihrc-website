
import { NextResponse } from "next/server";
import { parse } from "csv-parse/sync";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const id = request.nextUrl.pathname.split("/").pop();
  if (!id) return NextResponse.json({ error: "Missing id" }, { status: 400 });
  const { csv } = await request.json();
  if (!csv) return NextResponse.json({ error: "Missing csv" }, { status: 400 });

  type ResultRow = {
    rollNo?: string;
    studentName?: string;
    sgpa?: string;
    cgpa?: string;
    grade?: string;
    status?: string;
  };

  const records = parse(csv, {
    columns: ["rollNo","studentName","sgpa","cgpa","grade","status"],
    skip_empty_lines: true, relaxColumnCount: true, trim: true
  }) as ResultRow[];

  for (const r of records) {
    await db.resultRow.create({
      data: {
        sessionId: id,
        rollNo: String(r.rollNo || "").trim(),
        studentName: String(r.studentName || "").trim(),
        sgpa: r.sgpa ? parseFloat(r.sgpa) : null,
        cgpa: r.cgpa ? parseFloat(r.cgpa) : null,
        grade: r.grade ? String(r.grade) : null,
        status: r.status ? String(r.status) : null
      }
    });
  }
  return NextResponse.json({ ok: true, count: records.length });
}
