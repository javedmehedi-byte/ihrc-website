import { site } from "@/config/site"; // at top (because this is a client file, add: "use client"; already present)

<select
  className="w-full rounded-lg border px-3 py-2"
  value={form.courseCode}
  onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
>
  {site.courses.map(c => (
    <option key={c.code} value={c.code}>{c.code}</option>
  ))}
</select>
