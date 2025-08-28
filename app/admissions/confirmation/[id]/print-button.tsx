"use client";

type Props = { className?: string };

export default function PrintButton({ className }: Props) {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`no-print inline-flex items-center rounded-lg border px-5 py-2.5 font-medium bg-blue-600 text-white shadow-md hover:bg-blue-500 ${className ?? ""}`}
    >
      Print
    </button>
  );
}
