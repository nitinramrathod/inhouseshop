import CategoryList from "@/views/CategoryList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | In House Shop",
  description: "View Orders",
};

const CategoryListPage = () => {
  return <CategoryList></CategoryList>
}

export default CategoryListPage