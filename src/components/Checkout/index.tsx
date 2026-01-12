"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Login from "./Login";
import Shipping from "./Shipping";
import ShippingMethod from "./ShippingMethod";
import PaymentMethod from "./PaymentMethod";
import Coupon from "./Coupon";
import Billing from "./Billing";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useUserInfo } from "@/utils/hooks/user";
import { useOrderMutations } from "@/utils/hooks/order";
import { CreateOrderPayload } from "@/utils/services/order.service";
import { useDispatch } from "react-redux";
import { clearCheckout } from "@/redux/features/purchase-slice";
import MailSuccess from "../MailSuccess";
import { removeAllItemsFromCart } from "@/redux/features/cart-slice";

const Checkout = () => {
  const router = useRouter();
  const { data, isPending } = useUserInfo();
  const { createOrder } = useOrderMutations()
  const [selectedAddressId, setSelectedAddressId] = useState();
  const [selectedAddress, setSelectedAddress] = useState();
  const dispatch = useDispatch<AppDispatch>();
  const [orderCreated, setOrderCreated]= useState(false);

  const [paymentMethod, setPaymentMethod] = useState<"BANK" | "COD" | "PAYPAL">("COD");

  const buyNowFromRedux = useAppSelector((s) => s.purchaseReducer.checkout);

  const [buyNow, setBuyNow] = useState({
    items:[{
    id: "",
    type: "",
    title: "",
    price: 0,
    discountedPrice: 0,
    quantity: 0,
    image: ""
  }],
  totalPrice: 0
  });

  const handleAddressSelect = (address: any) => {
    setSelectedAddressId(address?._id);
    setSelectedAddress(address);
  }

  useEffect(() => {
    const buyNow =
      buyNowFromRedux ||
      JSON.parse(localStorage.getItem("checkout") || "null");

    if (!buyNow) {
      router.push("/");
    } else {
      const totalPrice = buyNow.reduce(
          (total, item) => total + item.discountedPrice * item.quantity,
          0
        );
      setBuyNow((prev)=>({...prev, items: buyNow, totalPrice}));
    }
  }, [])

  const handleCheckout = () => {

    let orderData: CreateOrderPayload = {
      items: buyNow?.items?.map(item=>({
        productId: item.id,
        quantity: item.quantity
      })),
      shippingAddress: selectedAddress,
      paymentMethod
    };

    createOrder.mutate(orderData, {
      onError: (e: any) => {
        console.log('error==>', e)
      },
      onSuccess: (e: any) => {

        setOrderCreated(true);
        localStorage.removeItem('checkout');
        
        if(buyNow.items[0].type == 'CART'){
          dispatch(removeAllItemsFromCart());
          console.log('Clear cart from backend ==>')
        }else{
          dispatch(clearCheckout());
        }      

        setTimeout(() => {
          setOrderCreated(false)
          router.push('/products');
        }, 3000);
      }
    })
  }

  useEffect(() => {
    const defaultAddress = data?.addresses?.find(item => item?.isDefault);
    setSelectedAddressId(defaultAddress?._id);
    setSelectedAddress(defaultAddress);

  }, [data])

  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      {orderCreated ? (<MailSuccess heading="Your Order Created Successfully."/>):      
      
      (<section className="overflow-hidden pt-30 py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                {!data && <Login />}

                {/* <!-- billing details --> */}
                <Billing
                  selectedAddress={selectedAddressId}
                  handleAddressSelect={handleAddressSelect}
                  addresses={data?.addresses}
                />

                {/* <!-- address box two --> */}
                <Shipping />

                {/* <!-- others note box --> */}
                <div className="bg-white shadow-1 rounded-[10px] p-4 sm:p-8.5 mt-7.5">
                  <div>
                    <label htmlFor="notes" className="block mb-2.5">
                      Other Notes (optional)
                    </label>

                    <textarea
                      name="notes"
                      id="notes"
                      rows={5}
                      placeholder="Notes about your order, e.g. speacial notes for delivery."
                      className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* // <!-- checkout right --> */}
              <div className="max-w-[455px] w-full">
                {/* <!-- order list box --> */}
                <div className="bg-white shadow-1 rounded-[10px]">
                  <div className="border-b border-gray-3 py-5 px-4 sm:px-8.5">
                    <h3 className="font-medium text-xl text-dark">
                      Your Order
                    </h3>
                  </div>



                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5 overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b border-gray-3">
                          <th className="py-5 text-left font-medium text-dark">
                            Product
                          </th>
                          <th className="py-5 text-center font-medium text-dark">
                            Qty
                          </th>
                          <th className="py-5 text-right font-medium text-dark">
                            Subtotal
                          </th>
                        </tr>
                      </thead>

                      <tbody>
                        {/* Product Row */}
                        {buyNow?.items?.map((item, i)=>(
                          <tr className="border-b border-gray-3" key={`purchase_item_${i}`}>
                          <td className="py-5 text-dark">
                            {item?.title}
                          </td>

                          <td className="py-5 text-center text-dark">
                            {item?.quantity}
                          </td>

                          <td className="py-5 text-right text-dark">
                            ₹{item?.discountedPrice}
                          </td>
                        </tr>
                        ))}
                        

                        {/* Total Row */}
                        <tr>
                          <td className="pt-5 font-medium text-lg text-dark">
                            Total
                          </td>

                          <td></td>

                          <td className="pt-5 text-right font-medium text-lg text-dark">
                            ₹{Number(buyNow?.totalPrice)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                </div>

                {/* <!-- coupon box --> */}
                <Coupon />

                {/* <!-- shipping box --> */}
                <ShippingMethod />

                {/* <!-- payment box --> */}
                <PaymentMethod
                  value={paymentMethod}
                  onChange={setPaymentMethod}
                />

                {/* <!-- checkout button --> */}
                <button
                  onClick={handleCheckout}
                  type="button"
                  className="w-full flex justify-center font-medium text-white bg-blue py-3 px-6 rounded-md ease-out duration-200 hover:bg-blue-dark mt-7.5"
                >
                  Process to Checkout
                </button>
              </div>
            </div>
          </form>
        </div>
      </section>)}
    </>
  );
};

export default Checkout;
