import { NextResponse } from "next/server";
import { setAdminSession, TOKEN } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const { password } = await req.json();

    if (!password || password !== process.env.ADMIN_PASSWORD) {
      return NextResponse.json({ ok: false, error: "Invalid password" }, { status: 401 });
    }

  const token = await setAdminSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(TOKEN, token, { httpOnly: true, path: "/" });
  return res;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ ok: false, error: "Internal server error" }, { status: 500 });
  }
}