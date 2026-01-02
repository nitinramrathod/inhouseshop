import CategoryDetail from "@/views/CategoryDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Category | In House Shop",
  description: "Create Category",
};

interface PageProps {
  params: {
    id: string;
  };
}

const CategoryDetailPage = async ({ params }: PageProps) => {

  const { id } = await params;

  // 🔹 Server-side fetch
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/categories/${id}`,
    {
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch category");
  }

  const category = await res.json();

  return <CategoryDetail data={category} />
}

export default CategoryDetailPage