import { Metadata } from "next";
import ProductDetail from "../../../../../views/ProductDetail";
// import { Product } from "@/types/product";
const backendURL = 'http://localhost:3001';


export const metadata: Metadata = {
  title: "Update Products | In House Shop",
  description: "Update Product.",
  // other metadata
};


const CreateProduct = async ({ params }) => {

  const res = await fetch(`${backendURL}/products/${params?.id}`, {
    method: "GET",
    cache: 'no-cache',
    headers: {
      "Content-Type": "application/json",
      // Add any other necessary headers here (e.g., authentication tokens)
    },
  });

  // If the response is not successful, handle the error
  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  // Parse the JSON response into product data
  const products = await res.json();

  // console.log('params', params)
  return <ProductDetail data={products.data}></ProductDetail>
}

export default CreateProduct