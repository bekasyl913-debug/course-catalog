import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CourseCardProps = {
  id: string;
  title: string;
  description: string;
  credits: number;
  likes: number;
};

export default function CourseCard({ id, title, description, credits, likes }: CourseCardProps) {
  return (
    <Link href={`/courses/${id}`} className="group block h-full rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500">
      <Card className="h-full border border-orange-100 bg-white hover:shadow-md hover:border-blue-300 transition">
        <CardHeader>
          <CardTitle className="text-lg leading-snug text-gray-900 group-hover:text-orange-600 transition-colors">{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-1 flex-col gap-3">
          <p className="text-sm leading-relaxed text-gray-500">{description}</p>
          <footer className="mt-auto flex items-center justify-between gap-2 pt-2">
            <span className="text-sm font-medium text-gray-500">{credits} credits</span>
            <Button asChild variant="ghost" size="sm" className="text-orange-600">
              <span aria-label={`${likes} likes`}>❤ {likes}</span>
            </Button>
          </footer>
        </CardContent>
      </Card>
    </Link>
  );
}

