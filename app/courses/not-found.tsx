import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <p className="text-6xl mb-4">🔍</p>
      <h2 className="text-2xl font-bold text-gray-900 mb-2">Course not found</h2>
      <p className="text-gray-500 mb-8">
        No course exists at this address.
      </p>
      <Link
        href="/courses"
        className="inline-block bg-orange-500 text-white px-6 py-2.5 rounded-xl hover:bg-orange-600 transition-colors font-semibold"
      >
        ← Back to courses
      </Link>
    </div>
  );
}
