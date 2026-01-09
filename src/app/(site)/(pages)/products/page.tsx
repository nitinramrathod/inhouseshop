import React from "react";
import ShopWithSidebar from "@/components/ShopWithSidebar";

import { Metadata } from "next";
import { serverFetch } from "@/utils/helper/serverFetch";
export const metadata: Metadata = {
  title: "Shop Page | NextCommerce Nextjs E-commerce template",
  description: "This is Shop Page for NextCommerce Template",
  // other metadata
};

const ShopWithSidebarPage = async() => {
  const products = await serverFetch(`/api/v1/products`,{requireAuth: false});

  return (
    <main>
      <ShopWithSidebar products={products}/>
    </main>
  );
};

export default ShopWithSidebarPage;
