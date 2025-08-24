import { absoluteUrl } from "@/lib/url";

type Notice = { id: string; title: string; slug: string; category: string; body: string; attachment?: string | null; publishedAt: string | null };

function formatDateTime(d?: string | null) {
  if (!d) return "Unpublished";
  const dt = new Date(d).toISOString();
  return dt.slice(0, 10) + " " + dt.slice(11, 16) + " UTC";
}

export default async function NoticeDetail({ params }: { params: { slug: string } }) {
  const res = await fetch(absoluteUrl(`/api/notices/${params.slug}`), { cache: "no-store" });
  if (!res.ok) return <div className="text-red-600">Notice not found.</div>;
  const n: Notice = await res.json();
  return (
    <article className="prose max-w-none">
      <h1>{n.title}</h1>
      <p className="text-sm opacity-70">{n.category} • {formatDateTime(n.publishedAt)}</p>
      <div className="my-6 whitespace-pre-wrap">{n.body}</div>
      {n.attachment && <a href={n.attachment} className="inline-flex items-center rounded-lg border px-4 py-2 font-medium" target="_blank">View Attachment</a>}
    </article>
  );
}
