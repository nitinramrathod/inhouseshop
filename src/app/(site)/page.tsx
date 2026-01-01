import Home from "@/components/Home";
import { Metadata } from "next";
// export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Inhouse Shop | Nextjs E-commerce template",
  description: "This is Home for NextCommerce Template",
  // other metadata
};

async function getProducts(searchParams:any) {

  // const query = new URLSearchParams(searchParams).toString();
  const query = ''

  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/products?${query}`, {
    cache: "no-store"
  });

  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function HomePage({ searchParams }: any) {
    const products = await getProducts(searchParams);  

  return (
    <>
      <Home products={products} />
    </>
  );
}
