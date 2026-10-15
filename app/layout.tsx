import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";





export const metadata: Metadata = {
  title: "Course Catalog",
  description: "Advanced Web Technologies course catalog",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-orange-50 text-gray-900">
        <nav className="bg-orange-500 px-6 py-4 shadow-md">
          <div className="max-w-6xl mx-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-white font-bold text-lg tracking-tight">
              📚 Course Catalog
            </span>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/"
                className="px-3 py-2 rounded-md text-white hover:bg-orange-600 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Home
              </Link>
              <Link
                href="/courses"
                className="px-3 py-2 rounded-md text-white hover:bg-orange-600 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Courses
              </Link>
              <Link
                href="/about"
                className="px-3 py-2 rounded-md text-white hover:bg-orange-600 font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                About
              </Link>
              <Link
  href="/filter"
  className="px-3 py-2 rounded-md text-white hover:bg-orange-600 font-medium"
>
  Filter
</Link>
            </div>
          </div>
        </nav>
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10">{children}</main>
      </body>
    </html>
  );
}

