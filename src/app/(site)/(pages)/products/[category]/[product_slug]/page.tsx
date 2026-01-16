import ShopDetails from "@/components/ShopDetails";
import { Metadata } from "next";
import { serverFetch } from "@/utils/helper/serverFetch";


type PageProps = {
  params: { product_slug: string };
};

export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {

  const {product_slug} = await params;

  const res:any = await serverFetch(
    `/api/v1/products/${product_slug}`,
    { requireAuth: false }
  );

  const p = res?.data;

  if (!p) {
    return {
      title: "Product Not Found",
      description: "This product is no longer available",
      robots: "noindex",
    };
  }

  const price = p.discountedPrice ?? p.price;
  const availability = p.stock > 0 ? "In Stock" : "Out of Stock";

  const title = `${p.brand} ${p.title} (${p.specifications?.ram}, ${p.specifications?.processor}) – ₹${price} | Buy Online`;

  const description =
    `Buy ${p.brand} ${p.title} with ${p.specifications?.processor}, ` +
    `${p.specifications?.ram}, ${p.specifications?.storage}. ` +
    `Rated ${p.averageRating}★ by customers. ${availability}. Order now.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/product/laptop/${product_slug}`,
    },

    openGraph: {
      type: "website",
      title,
      description,
      images: [
        {
          url: p.images?.[0],
          width: 1200,
          height: 630,
          alt: p.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [p.images?.[0]],
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

const ShopDetailsPage = async({params}:PageProps) => {
  const {product_slug} = await params;
  const product:any = await serverFetch(`/api/v1/products/${product_slug}`,{requireAuth: false});

  return (
    <main>
      <ShopDetails data={product?.data}/>
    </main>
  );
};

export default ShopDetailsPage;
