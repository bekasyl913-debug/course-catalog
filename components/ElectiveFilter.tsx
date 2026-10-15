"use client";

import { useState } from "react";
import useSWR from "swr";
import Link from "next/link";
import type { Course } from "@/lib/courses";

async function fetcher(url: string): Promise<Course[]> {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to load courses: ${res.status}`);
  }

  return res.json();
}

export default function ElectiveFilter() {
  const [electivesOnly, setElectivesOnly] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_API_URL}/courses${
    electivesOnly ? "?is_elective=true" : ""
  }`;

  const { data, error, isLoading } = useSWR<Course[]>(url, fetcher);

  return (
    <div className="space-y-6">
      <label className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={electivesOnly}
          onChange={(event) => setElectivesOnly(event.target.checked)}
        />
        Electives only
      </label>

      {isLoading && <p>Loading courses...</p>}
      {error && <p role="alert">Failed to load courses</p>}

      <div className="grid gap-4">
        {data?.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="block rounded-xl border p-4"
          >
            <h2 className="font-bold">{course.title}</h2>
            <p>{course.description}</p>
            <p>
              {course.credits} credits · ♥ {course.likes}
              {course.isElective && " · Elective"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}