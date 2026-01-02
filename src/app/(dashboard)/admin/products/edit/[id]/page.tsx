import { Metadata } from "next";
import ProductDetail from "../../../../../../views/ProductDetail";
import { serverFetch } from "@/utils/helper/serverFetch";

export const metadata: Metadata = {
  title: "Update Products | In House Shop",
  description: "Update Product.",
  // other metadata
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const CreateProduct = async ({ params }: PageProps) => {

  const { id } = await params;

  const product:any = await serverFetch(`/api/v1/products/${id}`);

  return <ProductDetail data={product?.data}></ProductDetail>
}

export default CreateProduct