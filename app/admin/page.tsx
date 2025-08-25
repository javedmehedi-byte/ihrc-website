import Link from "next/link";

export default function AdminHome() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="rounded-2xl border p-5 bg-white">
          <h2 className="text-lg font-semibold mb-2">Notices</h2>
          <p className="mb-4">Create and publish college notices.</p>
          <Link className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white" href="/admin/notices">Manage Notices</Link>
        </div>
        <div className="rounded-2xl border p-5 bg-white">
          <h2 className="text-lg font-semibold mb-2">Results</h2>
          <p className="mb-4">Create result sessions and upload CSV.</p>
          <Link className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white" href="/admin/results">Manage Results</Link>
        </div>
        <div className="rounded-2xl border p-5 bg-white">
          <h2 className="text-lg font-semibold mb-2">Applicants</h2>
          <p className="mb-4">View admissions applications.</p>
          <Link className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white" href="/admin/applicants">View Applicants</Link>
        </div>
      </div>
    </div>
  );
}
