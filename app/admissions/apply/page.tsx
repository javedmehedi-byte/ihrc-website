"use client";

import { useState } from "react";
import { site } from "@/config/site";

export default function ApplyPage() {
  const [form, setForm] = useState({
    fullName: "",
    dob: "",
    gender: "",
    email: "",
    phone: "",
    courseCode: site.courses[0].code,
    fatherName: "",
    motherName: "",
    address: "",
    qualification: "",
    classXMarksheet: null as File | null,
    classXiiMarksheet: null as File | null,
    passportPhoto: null as File | null,
    declare: false,
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
    if (!form.declare) {
      alert("Please confirm the declaration before submitting.");
      return;
    }
    const formData = new FormData();
    // Append strictly typed string fields
    const stringFields: Record<string, string> = {
      fullName: form.fullName,
      dob: form.dob,
      gender: form.gender,
      email: form.email,
      phone: form.phone,
      courseCode: form.courseCode,
      fatherName: form.fatherName,
      motherName: form.motherName,
      address: form.address,
      qualification: form.qualification,
    };
    for (const [k, v] of Object.entries(stringFields)) formData.append(k, v);
    // Append files if present
    if (form.classXMarksheet) formData.append("classXMarksheet", form.classXMarksheet);
    if (form.classXiiMarksheet) formData.append("classXiiMarksheet", form.classXiiMarksheet);
    if (form.passportPhoto) formData.append("passportPhoto", form.passportPhoto);

    const res = await fetch("/api/applicants", {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      const data = await res.json();
      const id = data?.id;
      setMessage("Application submitted successfully!");
      if (id) window.location.href = `/admissions/confirmation/${id}`;
    } else {
      setMessage("Failed to submit the application.");
    }
  };

  return (
    <form className="max-w-3xl mx-auto space-y-6" onSubmit={handleSubmit}>
      {/* Instructions */}
      <div className="rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-50 p-5 shadow-lg">
        <h2 className="text-xl font-semibold text-blue-800">Admission Application</h2>
        <p className="text-gray-900 mt-1">Fill all required fields and upload clear documents. Max file size 2MB. Accepted: PDF (marksheets), JPG/PNG (photo).</p>
        <ol className="mt-3 list-decimal pl-6 text-gray-900">
          <li>Submit the form online.</li>
          <li>On success, print the confirmation page.</li>
          <li>Submit two recent passport-size photographs along with the printed form.</li>
          <li>Submit the printed form at the college office with originals for verification.</li>
        </ol>
      </div>

      {message && (
        <div className={`p-4 rounded-lg ${message.includes("successfully") ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
          {message}
        </div>
      )}

      {/* Section A: Personal */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Full Name</label>
          <input type="text" name="fullName" className="w-full rounded-lg border px-3 py-2 text-black" value={form.fullName} onChange={handleChange} required />
        </div>
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Date of Birth</label>
          <input type="date" name="dob" className="w-full rounded-lg border px-3 py-2 text-black" value={form.dob} onChange={handleChange} required />
        </div>
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Gender</label>
          <select name="gender" className="w-full rounded-lg border px-3 py-2 text-black" value={form.gender} onChange={handleChange} required>
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
        </div>
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Course</label>
          <select name="courseCode" className="w-full rounded-lg border px-3 py-2 text-black" value={form.courseCode} onChange={handleChange} required>
            {site.courses.map((course) => (
              <option key={course.code} value={course.code}>
                {course.code} - {course.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Section B: Contact */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Email</label>
          <input type="email" name="email" className="w-full rounded-lg border px-3 py-2 text-black" value={form.email} onChange={handleChange} required />
        </div>
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Phone</label>
          <input type="tel" name="phone" className="w-full rounded-lg border px-3 py-2 text-black" value={form.phone} onChange={handleChange} required />
        </div>
      </div>

      {/* Section C: Parents */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Father&apos;s Name</label>
          <input type="text" name="fatherName" className="w-full rounded-lg border px-3 py-2 text-black" value={form.fatherName} onChange={handleChange} required />
        </div>
        <div className="card-3d p-4">
          <label className="block text-sm font-medium text-black">Mother&apos;s Name</label>
          <input type="text" name="motherName" className="w-full rounded-lg border px-3 py-2 text-black" value={form.motherName} onChange={handleChange} required />
        </div>
      </div>

      {/* Section D: Address */}
      <div className="card-3d p-4">
        <label className="block text-sm font-medium text-black">Address</label>
  <textarea name="address" className="w-full rounded-lg border px-3 py-2 text-black" value={form.address} onChange={handleChange} required />
      </div>

      {/* Section E: Education */}
      <div className="card-3d p-4">
        <label className="block text-sm font-medium text-black">Highest Qualification</label>
  <input type="text" name="qualification" className="w-full rounded-lg border px-3 py-2 text-black" value={form.qualification} onChange={handleChange} required />
      </div>

      {/* Section F: Documents */}
      <div className="card-3d p-4">
        <label className="block text-sm font-medium text-black">Class X Marksheet (PDF, max 2MB)</label>
  <input type="file" name="classXMarksheet" accept="application/pdf" className="w-full rounded-lg border px-3 py-2 text-black" onChange={handleFileChange} required />
      </div>
      <div className="card-3d p-4">
        <label className="block text-sm font-medium text-black">Class XII Marksheet (PDF, max 2MB)</label>
  <input type="file" name="classXiiMarksheet" accept="application/pdf" className="w-full rounded-lg border px-3 py-2 text-black" onChange={handleFileChange} required />
      </div>
      <div className="card-3d p-4">
        <label className="block text-sm font-medium text-black">Passport Size Photo (JPEG/PNG, max 2MB)</label>
  <input type="file" name="passportPhoto" accept="image/jpeg,image/png" className="w-full rounded-lg border px-3 py-2 text-black" onChange={handleFileChange} required />
      </div>

      {/* Declaration */}
      <div className="flex items-center gap-2">
        <input type="checkbox" id="declare" name="declare" onChange={(e) => setForm((p) => ({ ...p, declare: e.target.checked }))} />
        <label htmlFor="declare" className="text-sm">I confirm that the information provided is true to the best of my knowledge.</label>
      </div>

      <button type="submit" className="inline-flex items-center rounded-lg border px-5 py-2.5 font-medium bg-blue-600 text-white shadow-md hover:bg-blue-500">Submit</button>
    </form>
  );
}