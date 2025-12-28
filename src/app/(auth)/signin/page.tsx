import Signin from "@/components/Auth/Signin";
import React from "react";
import "../../css/euclid-circular-a-font.css";
import "../../css/style.css";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",
  // other metadata
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
