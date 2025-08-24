// lib/db.ts
import { PrismaClient } from "@prisma/client";
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const db =
  globalForPrisma.prisma ||
  new PrismaClient({ log: ["error", "warn"] });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;

// Function to save applicant data dynamically
export async function saveApplicant(applicantData: {
  fullName: string;
  email: string;
  phone: string;
  courseCode: string;
  address: string;
  fatherName: string;
  motherName: string;
  qualification: string;
  dob?: Date;
  gender?: string;
  classXMarksheet: string;
  classXiiMarksheet: string;
  passportPhoto: string;
}) {
  try {
    const item = await db.applicant.create({ data: applicantData });
    return item;
  } catch (error) {
    console.error("Failed to save applicant data:", error);
    throw new Error("Failed to save applicant data");
  }
}
