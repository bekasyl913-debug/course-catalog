export default function About() {
  return (
    <div className="max-w-2xl">
      <p className="text-orange-500 font-semibold uppercase tracking-widest text-sm mb-2">
        About this project
      </p>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">What is this?</h1>
      <div className="space-y-4 text-gray-700 leading-relaxed">
        <p>
          This catalog was built as part of the{" "}
          <span className="font-semibold text-orange-600">
            Advanced Web Technologies
          </span>{" "}
          course using Next.js 16 App Router, TypeScript, and Tailwind CSS.
        </p>
        <p>
          It demonstrates file-based routing, Server and Client Components,
          dynamic routes, and static generation with{" "}
          <code className="bg-orange-100 text-orange-700 px-1 py-0.5 rounded text-sm">
            generateStaticParams
          </code>
          .
        </p>
        <p>
          The project will grow throughout the semester — FastAPI backend,
          authentication, and a real database are coming in later labs.
        </p>
      </div>
    </div>
  );
}
