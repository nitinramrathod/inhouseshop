import ReviewList from "@/views/ReviewList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | In House Shop",
  description: "Manage product reviews",
};

const ReviewsPage = async({params}) => {
  const {product_id} = await params;
  return <ReviewList productId={product_id}/>;
};

export default ReviewsPage;
