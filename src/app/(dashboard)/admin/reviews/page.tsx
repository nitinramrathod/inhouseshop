import ReviewList from "@/views/ReviewList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reviews | In House Shop",
  description: "Manage product reviews",
};

const ReviewsPage = () => {
  return <ReviewList/>;
};

export default ReviewsPage;
