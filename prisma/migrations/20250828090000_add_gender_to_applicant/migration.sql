-- Add optional gender column to Applicant
ALTER TABLE "Applicant" ADD COLUMN IF NOT EXISTS "gender" TEXT;
