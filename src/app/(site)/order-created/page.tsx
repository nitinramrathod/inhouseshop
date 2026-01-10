import React from "react";
import MailSuccess from "@/components/MailSuccess";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Mail Success Page | NextCommerce Nextjs E-commerce template",
  description: "This is Mail Success Page for NextCommerce Template",
  // other metadata
};

const MailSuccessPage = () => {
  return (
    <main>
      <MailSuccess heading="Your Order Created Successfully."/>
    </main>
  );
};

export default MailSuccessPage;
