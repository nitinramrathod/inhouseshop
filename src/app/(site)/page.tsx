import Home from "@/components/Home";
import { serverFetch } from "@/utils/helper/serverFetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inhouse Shop | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
};


export default async function HomePage({ searchParams }: any) {
  const products = await serverFetch(`/api/v1/products`,{requireAuth: false});

  return (<Home products={products} />);
}
