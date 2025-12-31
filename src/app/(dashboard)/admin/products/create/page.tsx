import { Metadata } from "next";
import ProductDetail from "../../../../../views/ProductDetail";


export const metadata: Metadata = {
    title: "Create Products | In House Shop",
    description: "Create New Product.",
    // other metadata
  };


const CreateProduct = () => {
    return <ProductDetail></ProductDetail>
}

export default CreateProduct