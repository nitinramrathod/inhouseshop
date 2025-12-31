import OrderList from "@/views/OrderList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Orders | In House Shop",
  description: "View Orders",
};

const OrderListPage = () => {
  return <OrderList></OrderList>
}

export default OrderListPage