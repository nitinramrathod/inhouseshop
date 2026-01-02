import { serverFetch } from "@/utils/helper/serverFetch";
import CategoryDetail from "@/views/CategoryDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Category | In House Shop",
  description: "Create Category",
};

interface PageProps {
   params: Promise<{
    id: string;
  }>;
}

const CategoryDetailPage = async ({ params }: PageProps) => {

  const { id } = await params;

  const category = await serverFetch(`/api/v1/categories/${id}`);

  return <CategoryDetail data={category} />
}

export default CategoryDetailPage