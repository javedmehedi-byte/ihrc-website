"use client";
import React from "react";
import { site } from "@/config/site";

export default function AdminResultsPage() {
  const [form, setForm] = React.useState({ courseCode: "" });

  return (
    <select
      className="w-full rounded-lg border px-3 py-2"
      value={form.courseCode}
      onChange={(e) => setForm({ ...form, courseCode: e.target.value })}
    >
      {site.courses.map(c => (
        <option key={c.code} value={c.code}>{c.code}</option>
      ))}
    </select>
  );
}
