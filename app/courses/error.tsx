"use client";

export default function CoursesError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Failed to load courses
      </h2>
      <p>Check that the backend is running.</p>
      <button
        onClick={() => retry()}
        className="rounded-xl bg-orange-500 px-5 py-2.5 text-white"
      >
        Try again
      </button>
    </div>
  );
}