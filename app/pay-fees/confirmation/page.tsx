
"use client";
import Link from "next/link";

export default function PaymentConfirmationPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Payment Successful!</h1>
      <p className="text-lg mb-4">Thank you for your payment. A receipt has been sent to your email.</p>
      <p className="text-lg mb-4">If you need to download the receipt again, please contact the admin.</p>
      <Link
        href="/"
        className="block text-center bg-blue-600 text-white rounded-lg px-4 py-2 mt-4"
      >
        Go Back to Home
      </Link>
    </div>
  );
}