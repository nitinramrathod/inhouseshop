import CategoryList from "@/views/CategoryList";
import CategoryDetail from "@/views/CategoryDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | In House Shop",
  description: "View Orders",
};

const CategoryDetailPage = () => {
  return <CategoryDetail/>
}

export default CategoryDetailPage