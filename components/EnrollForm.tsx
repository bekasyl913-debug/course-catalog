"use client";

import { useState, type FormEvent } from "react";

export default function EnrollForm({
  courseId,
}: {
  courseId: string;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setMessage("");

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/enrollments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            courseId,
            studentName: name,
          }),
        },
      );

      const data = await res.json();

      if (!res.ok) {
        const detail = Array.isArray(data.detail)
          ? data.detail.map((item: { msg: string }) => item.msg).join("; ")
          : data.detail;

        setMessage(`The server rejected the data: ${detail}`);
        return;
      }

      setMessage(`Enrollment number: ${data.id}`);
      setName("");
    } catch {
      setMessage("Failed to connect to the server.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-3">
      <label htmlFor="student-name" className="block font-semibold">
        Your name
      </label>

      <input
        id="student-name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        required
        className="w-full rounded-lg border px-3 py-2"
      />

      <button
        type="submit"
        disabled={pending}
        className="rounded-xl bg-orange-500 px-5 py-2.5 text-white disabled:opacity-50"
      >
        {pending ? "Sending..." : "Enroll"}
      </button>

      <p role="status">{message}</p>
    </form>
  );
}