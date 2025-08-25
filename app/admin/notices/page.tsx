"use client";
import { useEffect, useState } from "react";

type Notice = {
  id?: string;
  title: string;
  slug: string;
  body: string;
  category: string;
  isPinned?: boolean;
  isPublished?: boolean;
};

export default function AdminNotices() {
  const [items, setItems] = useState<Notice[]>([]);
  const [form, setForm] = useState<Notice>({
    title: "",
    slug: "",
    body: "",
    category: "General",
    isPublished: false,
    isPinned: false,
  });

  async function load() {
    const res = await fetch("/api/notices");
    const data = await res.json();
    setItems(data.items || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/notices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setForm({ title: "", slug: "", body: "", category: "General", isPublished: false, isPinned: false });
      load();
    } else {
      alert("Save failed");
    }
  }

  async function togglePublish(id: string, isPublished: boolean) {
    const res = await fetch(`/api/notices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        isPublished,
        publishedAt: isPublished ? new Date().toISOString() : null,
      }),
    });
    if (res.ok) load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this notice?")) return;
    const res = await fetch(`/api/notices/${id}`, { method: "DELETE" });
    if (res.ok) load();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-semibold">Manage Notices</h1>

      {/* Create / update form */}
      <form onSubmit={save} className="rounded-2xl border p-5 bg-white grid gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Slug (unique URL)</label>
            <input
              className="w-full rounded-lg border px-3 py-2"
              value={form.slug}
              onChange={(e) => setForm({ ...form, slug: e.target.value })}
              placeholder="e.g., exam-form-dates"
              required
            />
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              className="w-full rounded-lg border px-3 py-2"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              <option>General</option>
              <option>Exam</option>
              <option>Admission</option>
            </select>
          </div>

          <div className="flex items-center gap-6 pt-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!form.isPinned}
                onChange={(e) => setForm({ ...form, isPinned: e.target.checked })}
              />
              Pin
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={!!form.isPublished}
                onChange={(e) => setForm({ ...form, isPublished: e.target.checked })}
              />
              Published
            </label>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Body</label>
          <textarea
            className="w-full rounded-lg border px-3 py-2 h-40"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
          />
        </div>

        <button className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white w-fit">
          Save Notice
        </button>
      </form>

      {/* List */}
      <div className="rounded-2xl border p-5 bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="py-2 text-left">Title</th>
              <th className="py-2 text-left">Category</th>
              <th className="py-2 text-left">Published</th>
              <th className="py-2 text-left">Actions</th>
            </tr>
          </thead>
        <tbody>
          {items.map((n: Record<string, any>) => (
            <tr key={n.id} className="border-t">
              <td className="py-2">{n.title}</td>
              <td className="py-2">{n.category}</td>
              <td className="py-2">{n.isPublished ? "Yes" : "No"}</td>
              <td className="py-2 space-x-2">
                <button
                  className="inline-flex items-center rounded-lg border px-3 py-1 font-medium"
                  onClick={() => togglePublish(n.id, !n.isPublished)}
                >
                  {n.isPublished ? "Unpublish" : "Publish"}
                </button>
                <button
                  className="inline-flex items-center rounded-lg border px-3 py-1 font-medium"
                  onClick={() => remove(n.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {items.length === 0 && (
            <tr><td className="py-2" colSpan={4}>No notices yet. Create one above.</td></tr>
          )}
        </tbody>
        </table>
      </div>
    </div>
  );
}
