"use client";

import { useState } from "react";
import { site } from "@/config/site";

export default function ApplyPage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    courseCode: site.courses[0].code,
    fatherName: "",
    motherName: "",
    address: "",
    qualification: "",
    classXMarksheet: null,
    classXiiMarksheet: null,
    passportPhoto: null,
  });

  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files[0].size <= 2 * 1024 * 1024) { // Check file size (2MB)
      setForm((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      alert("File size must be less than 2MB.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, value as string | Blob);
    });

    const res = await fetch("/api/admissions", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("Application submitted successfully!");
    } else {
      setMessage("Failed to submit the application.");
    }
  };

  return (
    <form
      className="bg-white text-gray-800 p-8 rounded-2xl shadow-card max-w-md mx-auto space-y-6 border border-gray-200"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">Application Form</h2>

      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-black">Full Name</label>
        <input
          type="text"
          name="fullName"
          className="w-full rounded-lg border px-3 py-2"
          value={form.fullName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Email</label>
        <input
          type="email"
          name="email"
          className="w-full rounded-lg border px-3 py-2"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Phone</label>
        <input
          type="tel"
          name="phone"
          className="w-full rounded-lg border px-3 py-2"
          value={form.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Course Code</label>
        <select
          name="courseCode"
          className="w-full rounded-lg border px-3 py-2"
          value={form.courseCode}
          onChange={handleChange}
          required
        >
          {site.courses.map((course) => (
            <option key={course.code} value={course.code}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </div>

      <div>
  <label className="block text-sm font-medium text-black">Father&apos;s Name</label>
        <input
          type="text"
          name="fatherName"
          className="w-full rounded-lg border px-3 py-2"
          value={form.fatherName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
  <label className="block text-sm font-medium text-black">Mother&apos;s Name</label>
        <input
          type="text"
          name="motherName"
          className="w-full rounded-lg border px-3 py-2"
          value={form.motherName}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Address</label>
        <textarea
          name="address"
          className="w-full rounded-lg border px-3 py-2"
          value={form.address}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Qualification</label>
        <input
          type="text"
          name="qualification"
          className="w-full rounded-lg border px-3 py-2"
          value={form.qualification}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Class X Marksheet (PDF, max 2MB)</label>
        <input
          type="file"
          name="classXMarksheet"
          accept="application/pdf"
          className="w-full rounded-lg border px-3 py-2"
          onChange={handleFileChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Class XII Marksheet (PDF, max 2MB)</label>
        <input
          type="file"
          name="classXiiMarksheet"
          accept="application/pdf"
          className="w-full rounded-lg border px-3 py-2"
          onChange={handleFileChange}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-black">Passport Size Photo (JPEG/PNG, max 2MB)</label>
        <input
          type="file"
          name="passportPhoto"
          accept="image/jpeg,image/png"
          className="w-full rounded-lg border px-3 py-2"
          onChange={handleFileChange}
          required
        />
      </div>

      <button
        type="submit"
        className="inline-flex items-center rounded-lg border px-4 py-2 font-medium bg-black text-white"
      >
        Submit
      </button>
    </form>
  );
}