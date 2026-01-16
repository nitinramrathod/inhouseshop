import HeroBannerList from "@/components/dashboard/HeroBanner/HeroBannerList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | In House Shop",
  description: "View Orders",
};

const OrderListPage = () => {
  return <HeroBannerList></HeroBannerList>
}

export default OrderListPage