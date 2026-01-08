import Home from "@/components/Home";
import { serverFetch } from "@/utils/helper/serverFetch";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Inhouse Shop | Refurbished Laptops & Desktops for Sale & Rent in India",
    template: "%s | Inhouse Shop",
  },

  description:
    "Inhouse Shop is an Indian online store for refurbished laptops and desktops with all accessories. Buy or rent laptops and desktops for students, schools, colleges, businesses, and professionals. Expert-verified products, best quality, and trusted service.",

  keywords: [
    "refurbished laptops India",
    "refurbished desktops India",
    "laptop on rent India",
    "desktop on rent India",
    "buy used laptops online",
    "laptop accessories online",
    "student laptop rental",
    "business laptop rental",
    "affordable laptops India",
    "Inhouse Shop",
  ],

  authors: [{ name: "Inhouse Shop", url: "https://www.inhouseshop.in" }],

  creator: "Inhouse Shop (India)",

  publisher: "Inhouse Shop",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },

  alternates: {
    canonical: "https://www.inhouseshop.in",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.inhouseshop.in",
    siteName: "Inhouse Shop",
    title: "Inhouse Shop | Refurbished Laptops & Desktops for Sale & Rent",
    description:
      "Buy or rent refurbished laptops and desktops in India. Trusted by students, schools, colleges, and businesses. Expert sellers, quality products, and complete accessories.",
    images: [
      {
        url: "https://www.inhouseshop.in/og/homepage.jpg",
        width: 1200,
        height: 630,
        alt: "Inhouse Shop - Refurbished Laptops and Desktops in India",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Inhouse Shop | Refurbished Laptops & Desktops in India",
    description:
      "India’s trusted store for refurbished laptops and desktops. Buy or rent for students, schools, colleges, and businesses.",
    images: ["https://www.inhouseshop.in/og/homepage.jpg"],
  },

  category: "technology",
};


export default async function HomePage({ searchParams }: any) {
  const products = await serverFetch(`/api/v1/products`,{requireAuth: false});
  const categories = await serverFetch(`/api/v1/categories`,{requireAuth: false});

  return (<Home products={products} categories={categories} />);
}
