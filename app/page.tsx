import Link from "next/link";

export default function Home() {
  return (
    <div className="py-10">
      <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-3">
        Advanced Web Technologies
      </p>
      <h1 className="text-5xl font-extrabold mb-5 text-gray-900 leading-tight">
        Your course catalog,<br />all in one place.
      </h1>
      <p className="text-gray-600 text-lg mb-8 max-w-xl">
        Browse every course in the program, see credits and descriptions, and
        mark the ones you like.
      </p>
      <Link
        href="/courses"
        className="inline-block bg-orange-500 text-white px-7 py-3 rounded-xl hover:bg-orange-600 transition-colors font-semibold text-base shadow-sm"
      >
        Browse Courses →
      </Link>
    </div>
  );
}
