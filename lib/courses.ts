export type Course = {
  id: string;
  title: string;
  description: string;
  credits: number;
  isElective: boolean;
  likes: number;
};

function getApiUrl(): string {
  const url = process.env.API_URL;

  if (!url) {
    throw new Error("API_URL is not set");
  }

  return url;
}

export async function getCourses(): Promise<Course[]> {
  const res = await fetch(`${getApiUrl()}/courses`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Failed to load courses: ${res.status}`);
  }

  return res.json();
}

export async function getCourse(
  id: string,
): Promise<Course | undefined> {
  const res = await fetch(
    `${getApiUrl()}/courses/${encodeURIComponent(id)}`,
    { cache: "no-store" },
  );

  if (res.status === 404) {
    return undefined;
  }

  if (!res.ok) {
    throw new Error(`Failed to load course: ${res.status}`);
  }

  return res.json();
}