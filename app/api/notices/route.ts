import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { db } from "@/lib/db";
import { isAdmin } from "@/lib/auth";

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir); // Create the uploads directory if it doesn't exist
}

const saveFile = async (file: File, fileName: string) => {
  const filePath = path.join(uploadDir, fileName);
  const fileStream = fs.createWriteStream(filePath);
  const readable = file.stream();
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

export async function GET(req: Request) {
  const items = await db.notice.findMany({
    orderBy: [
      { publishedAt: "desc" }
    ],
  });
  return NextResponse.json({ items });
}

export async function POST(req: Request) {
  const formData = await req.formData();

  // Extract fields from formData
  const fullName = formData.get("fullName");
  const email = formData.get("email");
  const phone = formData.get("phone");
  const courseCode = formData.get("courseCode");
  const fatherName = formData.get("fatherName");
  const motherName = formData.get("motherName");
  const address = formData.get("address");
  const qualification = formData.get("qualification");
  const classXMarksheet = formData.get("classXMarksheet") as File;
  const classXiiMarksheet = formData.get("classXiiMarksheet") as File;
  const passportPhoto = formData.get("passportPhoto") as File;

  // Validate required fields
  if (
    !fullName ||
    !email ||
    !phone ||
    !courseCode ||
    !fatherName ||
    !motherName ||
    !address ||
    !qualification ||
    !classXMarksheet ||
    !classXiiMarksheet ||
    !passportPhoto
  ) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  // Validate file sizes (2MB max)
  const maxFileSize = 2 * 1024 * 1024; // 2MB
  if (
    classXMarksheet.size > maxFileSize ||
    classXiiMarksheet.size > maxFileSize ||
    passportPhoto.size > maxFileSize
  ) {
    return NextResponse.json({ error: "File size must be less than 2MB" }, { status: 400 });
  }

  const allowedFileTypes = {
    classXMarksheet: ["application/pdf"],
    classXiiMarksheet: ["application/pdf"],
    passportPhoto: ["image/jpeg", "image/png"],
  };

  if (!allowedFileTypes.classXMarksheet.includes(classXMarksheet.type)) {
    return NextResponse.json({ error: "Invalid file type for Class X Marksheet" }, { status: 400 });
  }
  if (!allowedFileTypes.classXiiMarksheet.includes(classXiiMarksheet.type)) {
    return NextResponse.json({ error: "Invalid file type for Class XII Marksheet" }, { status: 400 });
  }
  if (!allowedFileTypes.passportPhoto.includes(passportPhoto.type)) {
    return NextResponse.json({ error: "Invalid file type for Passport Photo" }, { status: 400 });
  }

  // Save files locally
  const classXMarksheetPath = await saveFile(classXMarksheet, `classX_${Date.now()}_${classXMarksheet.name}`);
  const classXiiMarksheetPath = await saveFile(classXiiMarksheet, `classXii_${Date.now()}_${classXiiMarksheet.name}`);
  const passportPhotoPath = await saveFile(passportPhoto, `passport_${Date.now()}_${passportPhoto.name}`);

  // Save applicant data to the database
  const applicantData = {
    fullName: fullName as string,
    email: email as string,
    phone: phone as string,
    courseCode: courseCode as string,
    fatherName: fatherName as string,
    motherName: motherName as string,
    address: address as string,
    qualification: qualification as string,
    classXMarksheet: classXMarksheetPath,
    classXiiMarksheet: classXiiMarksheetPath,
    passportPhoto: passportPhotoPath,
  };

  try {
    const item = await db.applicant.create({ data: applicantData });
  } catch (error) {
    console.error("Failed to save applicant data:", error);
    return NextResponse.json({ error: "Failed to save applicant data" }, { status: 500 });
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

  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.ADMIN_EMAIL) {
    console.error("Missing email configuration in environment variables");
    return NextResponse.json({ error: "Server configuration error" }, { status: 500 });
  }

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

    return NextResponse.json({ message: "Application submitted successfully!" });
  } catch (error) {
    console.error("Failed to send email:", error);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
