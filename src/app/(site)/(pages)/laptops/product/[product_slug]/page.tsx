import React from "react";
import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { serverFetch } from "@/utils/helper/serverFetch";

export const metadata: Metadata = {
  title: "Shop Details Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Details Page for NextCommerce Template",
  // other metadata
};

const ShopDetailsPage = async({params}) => {
  const {product_slug} = await params;
  const product:any = await serverFetch(`/api/v1/products/${product_slug}`,{requireAuth: false});
  console.log('detail===>',product)
  return (
    <main>
      <ShopDetails data={product?.data}/>
    </main>
  );
};

export default ShopDetailsPage;
