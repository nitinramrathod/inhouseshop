import CategoryDetail from "@/views/CategoryDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Create Category | In House Shop",
  description: "Create Category",
};

const CategoryDetailPage = () => {
  return <CategoryDetail/>
}

export default CategoryDetailPage