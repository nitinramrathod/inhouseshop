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
import { clearBuyNow } from "@/redux/features/purchase-slice";

const Checkout = () => {
  const router = useRouter();
  const { data, isPending } = useUserInfo();
  const { createOrder } = useOrderMutations()
  const [selectedAddress, setSelectedAddress] = useState('1');
const dispatch = useDispatch<AppDispatch>();

  const [paymentMethod, setPaymentMethod] = useState<
    "BANK" | "COD" | "PAYPAL"
  >("COD");

  const buyNowFromRedux = useAppSelector((s) => s.purchaseReducer.buyNow);

  const [buyNow, setBuyNow] = useState({
    id: "",
    title: "",
    price: 0,
    discountedPrice: 0,
    quantity: 0,
    image: ""
  });



  const handleAddressSelect = (address: any) => {
    console.log(address)
    setSelectedAddress('2');
  }

  useEffect(() => {
    const buyNow =
      buyNowFromRedux ||
      JSON.parse(localStorage.getItem("buy_now") || "null");

    if (!buyNow) {
      router.push("/");
    } else {
      setBuyNow(buyNow);
    }
  }, [])

  const handleCheckout = () => {

    let orderData: CreateOrderPayload = {
      items: [{
        productId: buyNow.id,
        quantity: buyNow.quantity
      }],
      paymentMethod
    };

    createOrder.mutate(orderData, {
      onError: (e: any) => {
        console.log('error==>', e)
      },
      onSuccess: (e: any) => {
        localStorage.removeItem('buy_now');
        dispatch(clearBuyNow());

        router.push('/order-created')
      }
    })
  }



  return (
    <>
      <Breadcrumb title={"Checkout"} pages={["checkout"]} />
      <section className="overflow-hidden pt-30 py-20 bg-gray-2">
        <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
          <form>
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-11">
              {/* <!-- checkout left --> */}
              <div className="lg:max-w-[670px] w-full">
                {/* <!-- login box --> */}
                {!data && <Login />}

                {/* <!-- billing details --> */}
                <Billing
                  selectedAddress={selectedAddress}
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

                  <div className="pt-2.5 pb-8.5 px-4 sm:px-8.5">
                    {/* <!-- title --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <h4 className="font-medium text-dark">Product</h4>
                      </div>
                      <div>
                        <h4 className="font-medium text-dark text-right">
                          Subtotal
                        </h4>
                      </div>
                    </div>

                    {/* <!-- product item --> */}
                    <div className="flex items-center justify-between py-5 border-b border-gray-3">
                      <div>
                        <p className="text-dark">{buyNow?.title}</p>
                      </div>
                      <div>
                        <p className="text-dark text-right">₹{buyNow?.discountedPrice}</p>
                      </div>
                    </div>

                    {/* <!-- total --> */}
                    <div className="flex items-center justify-between pt-5">
                      <div>
                        <p className="font-medium text-lg text-dark">Total</p>
                      </div>
                      <div>
                        <p className="font-medium text-lg text-dark text-right">
                          ₹ {buyNow.discountedPrice}
                        </p>
                      </div>
                    </div>
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
      </section>
    </>
  );
};

export default Checkout;
