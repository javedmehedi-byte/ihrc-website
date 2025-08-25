import Link from "next/link";
import { absoluteUrl } from "@/lib/url";

type Notice = { id: string; title: string; slug: string; category: string; publishedAt: string | null };

function formatDate(d?: string | null) {
  if (!d) return "-";
  return new Date(d).toISOString().slice(0, 10);
}

export default async function NoticesPage() {
  let notices: Notice[] = [];
  try {
    const url = await absoluteUrl("/api/notices?published=1");
    const res = await fetch(url, { cache: "no-store" });
    if (res.ok) {
      const data = await res.json();
      notices = (data.items as Notice[]) || [];
    }
  } catch (_) {
    // Swallow and show empty state
  }
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-blue-600">Notices</h1>
      <div className="rounded-2xl border p-5 bg-white">
        <table className="w-full text-sm text-black">
          <thead>
            <tr>
              <th className="py-2 text-left">Title</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-left">Published</th>
            </tr>
          </thead>
          <tbody>
            {notices.map((n) => (
              <tr key={n.id} className="border-t">
                <td className="py-2 underline text-black">
                  <Link href={`/notices/${n.slug}`} className="text-black">
                    {n.title}
                  </Link>
                </td>
                <td className="py-2 text-black">{n.category}</td>
                <td className="py-2 text-black">{formatDate(n.publishedAt)}</td>
              </tr>
            ))}
            {notices.length === 0 && (
              <tr>
                <td className="py-2 text-black" colSpan={3}>
                  No notices yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
