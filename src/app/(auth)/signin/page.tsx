import Signin from "@/components/Auth/Signin";
import React from "react";
import "../../css/euclid-circular-a-font.css";
import "../../css/style.css";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { AuthOptions } from "@/libs/nextAuth/authOptions";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Signin Page | NextCommerce Nextjs E-commerce template",
  description: "This is Signin Page for NextCommerce Template",

};

const SigninPage = async () => {

  const session = await getServerSession(AuthOptions)

  if (session) {
    redirect("/admin")
  }

  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
