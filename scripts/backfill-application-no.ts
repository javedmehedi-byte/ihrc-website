import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Assign next sequence values to any NULL applicationNo
  const updated = await prisma.$executeRawUnsafe(`
    UPDATE "public"."Applicant" AS a
    SET "applicationNo" = nextval(pg_get_serial_sequence('"public"."Applicant"', 'applicationNo'))
    WHERE a."applicationNo" IS NULL;
  `);

  const remainingRows = await prisma.$queryRawUnsafe<{ count: string }[]>(
    'SELECT COUNT(*)::text AS count FROM "public"."Applicant" WHERE "applicationNo" IS NULL'
  );
  const remaining = parseInt(remainingRows?.[0]?.count ?? "0", 10);

  const maxRows = await prisma.$queryRawUnsafe<{ max: number | null }[]>(
    'SELECT MAX("applicationNo") AS max FROM "public"."Applicant"'
  );
  const maxAppNo = maxRows?.[0]?.max ?? null;

  console.log(`Updated: ${updated}; Remaining: ${remaining}; Max applicationNo: ${maxAppNo}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
