import { db } from "@/lib/db";
import type { Metadata } from "next";
import PrintButton from "@/app/components/PrintButton";

type ApplicantWithOptionalGender = Awaited<ReturnType<typeof db.applicant.findUnique>> & { gender?: string | null; applicationCode?: string | null; };

type Params = Promise<{ id: string }>;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const p = await params;
  return { title: `Application Confirmation ${p.id}` };
}

export default async function ConfirmationPage({ params }: { params: Params }) {
  const { id } = await params;
  const applicant: ApplicantWithOptionalGender | null = await db.applicant.findUnique({ where: { id } });
  if (!applicant) return <div className="text-red-600">Application not found.</div>;
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="rounded-2xl border bg-white p-6 shadow-lg">
  <h1 className="text-2xl font-bold">Application Submitted</h1>
  <p className="text-gray-800 mt-1">Application ID: <span className="font-mono">{applicant.applicationCode ?? "—"}</span></p>
  <p className="text-gray-700">Internal ID: <span className="font-mono">{applicant.id}</span></p>
  <p className="text-gray-700">Internal ID: <span className="font-mono">{applicant.id}</span></p>
        <div className="mt-4 rounded-lg bg-blue-50 p-4 border border-blue-200">
          <p className="font-semibold text-blue-800">Next Steps</p>
          <ol className="list-decimal pl-6 text-gray-900">
            <li>Use the button below to print this confirmation.</li>
            <li>Attach photocopies of required documents.</li>
            <li>Attach two recent passport-size photographs.</li>
            <li>Submit at the college office with originals for verification.</li>
          </ol>
        </div>
  <PrintButton className="mt-4" />
      </div>

      <div className="rounded-2xl border bg-white p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Applicant Details</h2>
        <div className="grid md:grid-cols-2 gap-4 text-gray-900">
          <div><span className="font-medium">Full Name:</span> {applicant.fullName}</div>
          <div><span className="font-medium">DOB:</span> {applicant.dob ? new Date(applicant.dob).toISOString().slice(0,10) : '-'}</div>
          <div><span className="font-medium">Gender:</span> {applicant.gender ?? '-'}</div>
          <div><span className="font-medium">Email:</span> {applicant.email}</div>
          <div><span className="font-medium">Phone:</span> {applicant.phone}</div>
          <div><span className="font-medium">Course:</span> {applicant.courseCode}</div>
          <div className="md:col-span-2"><span className="font-medium">Address:</span> {applicant.address}</div>
          <div className="md:col-span-2"><span className="font-medium">Qualification:</span> {applicant.qualification}</div>
        </div>
        {/* Photo pasting box for print */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-start-3">
            <div className="border-2 border-dashed rounded-lg h-40 w-32 mx-auto flex items-center justify-center text-center text-gray-600 print:h-40 print:w-32">
              <span className="text-xs">Paste Passport Size Photo Here</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
