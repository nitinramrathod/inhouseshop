import React from "react";
import ShopWithoutSidebar from "@/components/ShopWithoutSidebar";

import { Metadata } from "next";
import { serverFetch } from "@/utils/helper/serverFetch";
export const metadata: Metadata = {
  title: "Shop Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Page for NextCommerce Template",
  // other metadata
};

const ShopWithoutSidebarPage =async () => {
    const products = await serverFetch(`/api/v1/products`,{requireAuth: false});
  
  return (
    <main>
      <ShopWithoutSidebar products={products}/>
    </main>
  );
};

export default ShopWithoutSidebarPage;
