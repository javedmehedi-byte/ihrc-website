import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";

// Ensure Node.js runtime for Prisma/nodemailer
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Use a safe temp directory in production (e.g., Vercel serverless)
const baseUploadDir = process.env.NODE_ENV === "production" ? "/tmp" : process.cwd();
const uploadDir = path.join(baseUploadDir, "uploads");

async function ensureUploadsDir() {
  try {
    await fs.promises.mkdir(uploadDir, { recursive: true });
  } catch {
    // ignore mkdir errors; we'll error when writing if truly unavailable
  }
}

const saveFile = async (file: File, fileName: string) => {
  await ensureUploadsDir();
  const filePath = path.join(uploadDir, fileName);
  const fileStream = fs.createWriteStream(filePath);
  const readable = file.stream();
  // Convert web ReadableStream to Node.js stream
  const reader = readable.getReader();
  async function pump() {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      fileStream.write(Buffer.from(value));
    }
    fileStream.end();
  }
  await pump();
  return filePath; // Return the file path for storage in the database
};

export async function GET() {
  const items = await db.applicant.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  // Quick sanity check for DB config
  if (!process.env.DATABASE_URL) {
    const msg = "Database is not configured (DATABASE_URL missing).";
    console.error(msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }

  const formData = await req.formData();

  // Extract fields from formData
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const courseCode = formData.get("courseCode");
  const fatherName = formData.get("fatherName");
  const motherName = formData.get("motherName");
  const dob = formData.get("dob");
  const gender = formData.get("gender");
  const address = formData.get("address");
  const qualification = formData.get("qualification");
  const classXMarksheet = formData.get("classXMarksheet") as File;
  const classXiiMarksheet = formData.get("classXiiMarksheet") as File;
  const passportPhoto = formData.get("passportPhoto") as File;

  // Validate required fields with a clearer message
  const missing: string[] = [];
  if (!fullName) missing.push("fullName");
  if (!email) missing.push("email");
  if (!phone) missing.push("phone");
  if (!courseCode) missing.push("courseCode");
  if (!fatherName) missing.push("fatherName");
  if (!motherName) missing.push("motherName");
  if (!address) missing.push("address");
  if (!qualification) missing.push("qualification");
  if (!classXMarksheet) missing.push("classXMarksheet");
  if (!classXiiMarksheet) missing.push("classXiiMarksheet");
  if (!passportPhoto) missing.push("passportPhoto");
  if (missing.length) {
    return NextResponse.json({ error: `Missing fields: ${missing.join(", ")}` }, { status: 400 });
  }

  // Validate file sizes (5MB max)
  const maxFileSize = 5 * 1024 * 1024; // 5MB
  if (
    classXMarksheet.size > maxFileSize ||
    classXiiMarksheet.size > maxFileSize ||
    passportPhoto.size > maxFileSize
  ) {
    return NextResponse.json({ error: "File size must be less than 5MB" }, { status: 400 });
  }

  // Save files locally
  const classXMarksheetPath = await saveFile(classXMarksheet, `classX_${Date.now()}_${classXMarksheet.name}`);
  const classXiiMarksheetPath = await saveFile(classXiiMarksheet, `classXii_${Date.now()}_${classXiiMarksheet.name}`);
  const passportPhotoPath = await saveFile(passportPhoto, `passport_${Date.now()}_${passportPhoto.name}`);

  // Prepare applicant data (without applicationCode yet)
  const applicantData = {
    fullName: fullName as string,
    email: email as string,
    phone: phone as string,
    courseCode: courseCode as string,
    dob: dob ? new Date(String(dob)) : null,
    gender: gender ? String(gender) : null,
    fatherName: fatherName as string,
    motherName: motherName as string,
    address: address as string,
    qualification: qualification as string,
    classXMarksheet: classXMarksheetPath,
    classXiiMarksheet: classXiiMarksheetPath,
    passportPhoto: passportPhotoPath,
  };

  let created;
  try {
    const cc = String(courseCode);
    const year = new Date().getFullYear();
    created = await db.$transaction(async (tx) => {
      // Ensure helper table exists
      await tx.$executeRawUnsafe('CREATE TABLE IF NOT EXISTS "public"."CourseSequence" ("courseCode" TEXT PRIMARY KEY, "last" INTEGER NOT NULL DEFAULT 0, "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP, "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP)');
      // Atomically increment and return the new sequence value for this course
      const rows = await tx.$queryRawUnsafe<{ last: number }[]>(
        'INSERT INTO "public"."CourseSequence" ("courseCode", "last") VALUES ($1, 1) ON CONFLICT ("courseCode") DO UPDATE SET "last" = "CourseSequence"."last" + 1 RETURNING "last";',
        cc,
      );
      const next = rows?.[0]?.last ?? 1;
      const code = `${cc}-${year}-${String(next).padStart(4, "0")}`;
      const item = await tx.applicant.create({ data: applicantData });
      await tx.$executeRawUnsafe(
        'UPDATE "public"."Applicant" SET "applicationCode" = $1 WHERE "id" = $2',
        code,
        item.id,
      );
      // Return a shape that includes applicationCode for the response
      return { ...item, applicationCode: code } as typeof item & { applicationCode: string };
    });
  } catch (error: unknown) {
    console.error("Failed to save applicant data:", error);
    let message = "Failed to save applicant data";
    if (process.env.NODE_ENV !== "production") {
      if (error instanceof Error) message = error.message;
      else if (typeof error === "string") message = error;
    }
    return NextResponse.json({ error: message }, { status: 500 });
  }

  // Send email notifications (same as before)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const adminEmail = process.env.ADMIN_EMAIL;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: adminEmail,
      subject: "New Admission Application",
      text: `A new application has been submitted by ${fullName}.`,
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email as string,
      subject: "Application Submitted Successfully",
      text: `Dear ${fullName}, your application has been submitted successfully.`,
    });

  return NextResponse.json({ message: "Application submitted successfully!", id: created.id, applicationCode: (created as { applicationCode?: string | null }).applicationCode });
  } catch (error) {
    console.error("Failed to send email:", error);
  // Even if email fails, return success with id so user can proceed
  return NextResponse.json({ message: "Application submitted successfully!", id: created.id, emailError: true });
  }
}
