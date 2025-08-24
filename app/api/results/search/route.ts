import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const q = (searchParams.get("q") || "").trim();
  if (!q) return NextResponse.json({ items: [] });

  const sessions = await db.resultSession.findMany({
    where: { isPublished: true },
    select: { id: true, title: true, courseCode: true, semester: true }
  });
  const sessionIds = sessions.map(s => s.id);
  if (sessionIds.length === 0) return NextResponse.json({ items: [] });

  const rows = await db.resultRow.findMany({
    where: { sessionId: { in: sessionIds }, OR: [{ rollNo: { contains: q } }, { studentName: { contains: q } }] },
    take: 50
  });

  const items = rows.map(r => {
    const s = sessions.find(s => s.id === r.sessionId)!;
    return { sessionTitle: s.title, courseCode: s.courseCode, semester: s.semester, rollNo: r.rollNo, studentName: r.studentName, sgpa: r.sgpa, cgpa: r.cgpa, grade: r.grade, status: r.status };
  });
  return NextResponse.json({ items });
}
