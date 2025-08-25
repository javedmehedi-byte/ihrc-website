"use client";

import { useEffect, useState } from "react";

export default function PayFeesPage() {
  const [formData, setFormData] = useState({
    courseName: "",
    candidateName: "",
    enrollmentNumber: "",
    semester: "",
    feeAmount: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const loadScript = (src: string) => new Promise<boolean>((resolve) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.body.appendChild(s);
  });

  const handlePayment = async () => {
    try {
      const amountNumber = Number(formData.feeAmount);
      if (!formData.courseName || !formData.candidateName || !formData.enrollmentNumber || !formData.semester || !amountNumber) {
        alert("Please fill all fields with valid values.");
        return;
      }

      const res = await fetch("/api/pay-fees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        alert(data.error || "Failed to initiate payment.");
        return;
      }

      const ok = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!ok) {
        alert("Failed to load payment SDK. Please try again.");
        return;
      }

      // @ts-ignore Razorpay is injected globally by the script
      const r = new window.Razorpay({
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        order_id: data.orderId,
        name: "IHRC Paramedical College",
        description: `Fee Payment - ${formData.courseName} - ${formData.semester}`,
        prefill: { name: formData.candidateName },
        notes: {
          courseName: formData.courseName,
          candidateName: formData.candidateName,
          enrollmentNumber: formData.enrollmentNumber,
          semester: formData.semester,
        },
        handler: function () {
          window.location.href = "/pay-fees/confirmation";
        },
        modal: { ondismiss: () => {} },
      });
      r.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
      alert("An error occurred while processing your payment.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4 text-black">Pay Fees</h1>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-black">Course Name</label>
          <select
            name="courseName"
            className="w-full border rounded-lg px-3 py-2 text-black"
            value={formData.courseName}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            <option value="MLT">Medical Lab Technology</option>
            <option value="OTT">Operation Theatre Technology</option>
            <option value="DT">Dialysis Technology</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Candidate Name</label>
          <input
            type="text"
            name="candidateName"
            className="w-full border rounded-lg px-3 py-2 text-black"
            value={formData.candidateName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Enrollment Number</label>
          <input
            type="text"
            name="enrollmentNumber"
            className="w-full border rounded-lg px-3 py-2 text-black"
            value={formData.enrollmentNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Semester</label>
          <select
            name="semester"
            className="w-full border rounded-lg px-3 py-2 text-black"
            value={formData.semester}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            <option value="1st Sem">1st Sem</option>
            <option value="2nd Sem">2nd Sem</option>
            <option value="3rd Sem">3rd Sem</option>
            <option value="4th Sem">4th Sem</option>
            <option value="5th Sem">5th Sem</option>
            <option value="6th Sem">6th Sem</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-black">Fee Amount</label>
          <input
            type="number"
            name="feeAmount"
            className="w-full border rounded-lg px-3 py-2 text-black"
            value={formData.feeAmount}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="button"
          className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 font-bold"
          onClick={handlePayment}
        >
          Pay Now
        </button>
      </form>
    </div>
  );
}