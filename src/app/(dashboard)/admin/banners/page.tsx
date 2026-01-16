import HeroBannerList from "@/components/dashboard/Banner/BannerList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | In House Shop",
  description: "View Orders",
};

const OrderListPage = () => {
  return <HeroBannerList></HeroBannerList>
}

export default OrderListPage