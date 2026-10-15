import { notFound } from "next/navigation";
import { getCourse } from "@/lib/courses";
import LikeButton from "@/components/LikeButton";
import EnrollForm from "@/components/EnrollForm";

export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = await getCourse(id);

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-2xl">
      <div className="flex gap-2 mb-4">
        <span className="bg-orange-100 text-orange-700 text-xs font-semibold px-3 py-1 rounded-full">
          {course.isElective ? "Elective" : "Core"}
        </span>
        <span className="bg-gray-100 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
          {course.credits} credits
        </span>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">{course.title}</h1>
      <p className="text-gray-600 text-lg leading-relaxed mb-10">
        {course.description}
      </p>
<LikeButton courseId={course.id} initialLikes={course.likes} />
<EnrollForm courseId={course.id} />
    </div>
  );
}
