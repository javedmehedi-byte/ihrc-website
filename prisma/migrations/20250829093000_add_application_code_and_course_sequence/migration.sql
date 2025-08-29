-- Add applicationCode column for formatted course-wise application numbers
ALTER TABLE "public"."Applicant"
ADD COLUMN IF NOT EXISTS "applicationCode" TEXT;

-- Unique index on applicationCode (allows multiple NULLs)
CREATE UNIQUE INDEX IF NOT EXISTS "Applicant_applicationCode_key"
ON "public"."Applicant"("applicationCode");

-- Table to maintain per-course sequences
CREATE TABLE IF NOT EXISTS "public"."CourseSequence" (
  "courseCode" TEXT PRIMARY KEY,
  "last" INTEGER NOT NULL DEFAULT 0,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Function and trigger to auto-update updatedAt on CourseSequence
CREATE OR REPLACE FUNCTION set_timestamp_courseseq()
RETURNS TRIGGER AS $$
BEGIN
  NEW."updatedAt" = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp_courseseq ON "public"."CourseSequence";
CREATE TRIGGER set_timestamp_courseseq
BEFORE UPDATE ON "public"."CourseSequence"
FOR EACH ROW
EXECUTE FUNCTION set_timestamp_courseseq();
