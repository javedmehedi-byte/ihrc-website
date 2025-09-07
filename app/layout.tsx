import "./globals.css";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: site.name,
  description: site.tagline,
  icons: [{ rel: "icon", url: "/logo.png" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-gray-50 text-gray-900 flex flex-col min-h-screen" suppressHydrationWarning>
        {/* Header Section */}
        <header className="border-b bg-blue-700 text-white">
          <nav className="max-w-5xl mx-auto px-4 py-3 flex gap-3 items-center flex-wrap">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="IHRC Logo" className="h-10 rounded-md" width={40} height={40} />
              <Link href="/" className="font-extrabold text-lg md:text-xl tracking-wide">
                IHRC PARAMEDICAL COLLEGE
              </Link>
            </div>
            <div className="flex gap-3 ml-auto">
              <Link href="/notices" className="header-link">
                Notices
              </Link>
              <Link href="/admissions/apply" className="header-link">
                Admissions
              </Link>
              <Link href="/pay-fees" className="header-link">
                Pay Fees
              </Link>
              <Link href="/admin" className="header-link">
                Admin
              </Link>
            </div>
          </nav>
        </header>

        {/* Main Content */}
        <div className="flex-grow">
          <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
            {/* Copyright Section */}
            <div className="text-center md:text-left mb-4 md:mb-0">
              <p className="text-sm">&copy; {new Date().getFullYear()} IHRC Paramedical College. All rights reserved.</p>
            </div>

            {/* Contact Info Section */}
            <div className="text-center md:text-right">
              <p className="text-sm">Contact us: info@ihrcparamedicalcollege.com</p>
              <p className="text-sm">Phone: +91-7005176498</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}