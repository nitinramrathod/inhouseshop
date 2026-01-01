import CategoryList from "@/views/CategoryList";
import CreateCategory from "@/views/CreateCategory";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | In House Shop",
  description: "View Orders",
};

const CategoryDetailPage = () => {
  return <CreateCategory></CreateCategory>
}

export default CategoryDetailPage