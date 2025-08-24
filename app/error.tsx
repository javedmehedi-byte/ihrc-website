"use client";

import React from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="flex flex-col items-center justify-center min-h-screen bg-red-50 text-red-900">
        <div className="max-w-md p-8 bg-white rounded-2xl shadow-lg border border-red-200">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">An unexpected error occurred. Please try again or contact support if the problem persists.</p>
          <button
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => reset()}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  );
}
