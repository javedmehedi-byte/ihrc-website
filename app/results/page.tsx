"use client";
import { useState } from "react";

type Row = {
  sessionTitle: string; courseCode: string; semester: number;
  rollNo: string; studentName: string; sgpa?: number | null; cgpa?: number | null; grade?: string | null; status?: string | null;
};

export default function ResultsPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<Row[] | null>(null);
  const [loading, setLoading] = useState(false);

  async function search() {
    setLoading(true);
    const res = await fetch(`/api/results/search?q=${encodeURIComponent(q)}`);
    const data = await res.json();
    setRows(data.items || []);
    setLoading(false);
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-black">Results</h1>
      <div className="rounded-2xl border p-5 bg-white space-y-3">
        <label className="block text-sm font-medium text-black">Search by Roll Number or Name</label>
        <input
          className="w-full rounded-lg border px-3 py-2 text-black placeholder-black"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="e.g., BPT22001 or Ishita"
        />
        <button
          className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white"
          onClick={search}
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>

      {rows && (
        <div className="rounded-2xl border p-5 bg-white">
          {rows.length === 0 ? (
            <div className="text-black">No results found.</div>
          ) : (
            <table className="w-full text-sm text-black">
              <thead>
                <tr>
                  <th className="py-2 text-left">Session</th>
                  <th className="py-2 text-left">Roll No</th>
                  <th className="py-2 text-left">Name</th>
                  <th className="py-2 text-left">SGPA</th>
                  <th className="py-2 text-left">CGPA</th>
                  <th className="py-2 text-left">Grade</th>
                  <th className="py-2 text-left">Status</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={i} className="border-t">
                    <td className="py-2">{r.sessionTitle} ({r.courseCode} Sem {r.semester})</td>
                    <td className="py-2">{r.rollNo}</td>
                    <td className="py-2">{r.studentName}</td>
                    <td className="py-2">{r.sgpa ?? "-"}</td>
                    <td className="py-2">{r.cgpa ?? "-"}</td>
                    <td className="py-2">{r.grade ?? "-"}</td>
                    <td className="py-2">{r.status ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
