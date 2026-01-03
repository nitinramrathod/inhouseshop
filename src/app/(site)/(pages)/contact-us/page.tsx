import Contact from "@/components/Contact";

import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Contact Us | Inhouse Shop – Refurbished Laptops & Rentals in India",

  description:
    "Contact Inhouse Shop for refurbished laptops and desktops, rentals for students, schools, colleges, and businesses in India. Get expert assistance, product support, and sales inquiries online.",

  keywords: [
    "contact Inhouse Shop",
    "laptop store contact India",
    "refurbished laptop support",
    "laptop rental contact India",
    "desktop rental support",
    "buy refurbished laptops India",
    "Inhouse Shop customer care",
  ],

  robots: {
    index: true,
    follow: true,
  },

  alternates: {
    canonical: "https://www.inhouseshop.in/contact-us",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.inhouseshop.in/contact-us",
    siteName: "Inhouse Shop",
    title: "Contact Inhouse Shop | Laptop & Desktop Sales and Rentals",
    description:
      "Reach out to Inhouse Shop for refurbished laptops, desktops, accessories, and rental services in India. Our experts are ready to help students, businesses, and institutions.",
    images: [
      {
        url: "https://www.inhouseshop.in/og/contact-us.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Inhouse Shop – Laptop & Desktop Experts",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Contact Inhouse Shop | Laptop & Desktop Experts",
    description:
      "Need help buying or renting refurbished laptops or desktops in India? Contact Inhouse Shop for expert guidance and support.",
    images: ["https://www.inhouseshop.in/og/contact-us.jpg"],
  },

  category: "business",
};

const ContactPage = () => {
  return (
    <main>
      <Contact />
    </main>
  );
};

export default ContactPage;
