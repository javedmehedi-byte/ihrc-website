import { absoluteUrl } from "@/lib/url";

type Applicant = { id: string; applicationNo?: number | null; fullName: string; email: string; phone: string; courseCode: string; createdAt: string };

function formatDateTime(d: string) {
  const iso = new Date(d).toISOString();
  return iso.slice(0, 10) + " " + iso.slice(11, 16) + " UTC";
}

export default async function ApplicantsPage() {
  let items: Applicant[] = [];
  try {
    const url = await absoluteUrl("/api/applicants");
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      items = (data.items as Applicant[]) || [];
    }
  } catch {
    // swallow and render empty state below
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Applicants</h1>
      <div className="rounded-2xl border p-5 bg-white">
        <table className="w-full text-sm">
          <thead><tr><th className="py-2 text-left">App No</th><th className="py-2 text-left">Name</th><th className="py-2 text-left">Email</th><th className="py-2 text-left">Phone</th><th className="py-2 text-left">Course</th><th className="py-2 text-left">Applied</th></tr></thead>
          <tbody>
            {items.map(a => (
              <tr key={a.id} className="border-t">
                <td className="py-2 font-mono">{a.applicationNo ?? "—"}</td>
                <td className="py-2">{a.fullName}</td>
                <td className="py-2">{a.email}</td>
                <td className="py-2">{a.phone}</td>
                <td className="py-2">{a.courseCode}</td>
                <td className="py-2">{formatDateTime(a.createdAt)}</td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr><td className="py-2" colSpan={6}>No applicants yet.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
