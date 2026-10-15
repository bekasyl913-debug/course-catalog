"use client";

import { useState } from "react";
import type { Course } from "@/lib/courses";

type LikeButtonProps = {
  courseId: string;
  initialLikes: number;
};

export default function LikeButton({
  courseId,
  initialLikes,
}: LikeButtonProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function handleLike() {
    setPending(true);
    setError("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${encodeURIComponent(courseId)}/like`,
        { method: "POST" },
      );

      if (!res.ok) {
        throw new Error(`Like failed: ${res.status}`);
      }

      const course: Course = await res.json();
      setLikes(course.likes);
    } catch {
      setError("Failed to send like. Try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={handleLike}
        disabled={pending}
        className="rounded-xl bg-orange-500 px-5 py-2.5 text-white hover:bg-orange-600 disabled:opacity-50"
      >
        {pending ? "Sending..." : `♥ ${likes}`}
      </button>
      {error && <p role="alert">{error}</p>}
    </div>
  );
}