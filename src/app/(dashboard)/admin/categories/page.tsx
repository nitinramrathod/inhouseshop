import CategoryList from "@/views/CategoryList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Categories | In House Shop",
  description: "Categories List",
};

const CategoryListPage = () => {
  return <CategoryList/>
}

export default CategoryListPage