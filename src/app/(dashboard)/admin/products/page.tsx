import { Metadata } from "next";
import ProductList from "@/views/ProductList";

export const metadata: Metadata = {
  title: "Products | In House Shop",
  description: "Products list page."
};

const ProductListPage = () => {    
    return <ProductList/>
};

export default ProductListPage;
