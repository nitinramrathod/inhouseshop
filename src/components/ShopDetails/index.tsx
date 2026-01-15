"use client";
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "../Common/Breadcrumb";
import Image from "next/image";
import Newsletter from "../Common/Newsletter";
import RecentlyViewdItems from "./RecentlyViewd";
import { usePreviewSlider } from "@/app/context/PreviewSliderContext";
import { AppDispatch, useAppSelector } from "@/redux/store";
import ProductSpecifications from "./ProductSpecifications";
import { CircleCheck, Fullscreen, Minus, Plus } from "lucide-react";
import Reviews from "../Shop/Reviews";
import { BuyNowPayload, setCheckout } from "@/redux/features/purchase-slice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import StarRating from "../Common/Form/StarRating";
import { useReviewMutation, useReviews } from "@/utils/hooks/review";
import { CreateReviewPayload } from "@/utils/services/review.service";
import Avatar from "../Header/Avatar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { calculateDiscountPercentage } from "@/utils/helper/calculateDiscountPercentage";

const ShopDetails = ({ data }: any) => {
  const { openPreviewModal } = usePreviewSlider();
  const [previewImg, setPreviewImg] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("tabOne");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  const { data: reviews } = useReviews(data._id);

  const { createReview } = useReviewMutation();

  const {data:session} = useSession()

  const [review, setReview] = useState<CreateReviewPayload>({
    comment: "",
    product: data?._id,
    rating: 0
  });

  const handleSetReview = (rating) => {
    setReview(prev => ({
      ...prev,
      rating
    }))
  }

  const handleSubmitReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries()) as { comment: string };

    setReview(prev => ({ ...prev, comment: data?.comment }))

    createReview.mutate({ ...review, comment: data?.comment },
      {
        onError: (e) => {
          console.log('error', e)
        },
        onSuccess(data) {
          setReview(prev => ({
            ...prev,
            rating: 0,
            comment: "",
          }))
          // ✅ Reset form
          formRef.current?.reset();
        },
      })
  }



  const tabs = [
    {
      id: "tabOne",
      title: "Description",
    },
    {
      id: "tabTwo",
      title: "Additional Information",
    },
    {
      id: "tabThree",
      title: "Reviews",
    },
  ];

  const alreadyExist = localStorage.getItem("productDetails");
  const productFromStorage = useAppSelector(
    (state) => state.productDetailsReducer.value
  );

  const product = alreadyExist ? JSON.parse(alreadyExist) : productFromStorage;

  useEffect(() => {
    localStorage.setItem("productDetails", JSON.stringify(product));
  }, [product]);

  // pass the product here when you get the real data.
  const handlePreviewSlider = () => {
    openPreviewModal();
  };

  const handleBuyNow = () => {
    const buyNowData: BuyNowPayload = [{
      type: "BUY_NOW",
      id: data._id as string,
      title: data.title as string,
      price: data.price as number,
      discountedPrice: data.discountedPrice as number,
      image: data.images[0] as string,
      quantity,
    }];

    dispatch(setCheckout(buyNowData));

    localStorage.setItem("checkout", JSON.stringify(buyNowData));

    router.push("/checkout");
  };

  const [specs, setSpecs] = useState<{ label: string; value: any; }[]>();

  if (!data) {
    return (
      <div className="h-screen">
        <h1>No Product Found</h1>
      </div>
    )
  }

  useEffect(() => {
    const specs = [
      { label: "Processor", value: data.specifications.processor },
      { label: "RAM", value: data.specifications.ram },
      { label: "Storage", value: data.specifications.storage },
      { label: "Graphics", value: data.specifications.graphics },
      { label: "Display", value: data.specifications.display },
      { label: "Operating System", value: data.specifications.os },
    ];

    setSpecs(specs);

  }, [data]);




  return (
    <>
      <Breadcrumb title={"Shop Details"} pages={["shop details"]} />
      <>
        <section className="overflow-hidden relative pb-20 pt-5 lg:pt-20 xl:pt-28">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex flex-col lg:flex-row gap-7.5 xl:gap-17.5">
              <div className="lg:max-w-[570px] w-full">
                <div className="lg:min-h-[512px] rounded-lg shadow-1 bg-gray-2 p-4 sm:p-7.5 relative flex items-center justify-center">
                  <div>
                    <button
                      onClick={handlePreviewSlider}
                      aria-label="button for zoom"
                      className="gallery__Image w-11 h-11 rounded-[5px] bg-gray-1 shadow-1 flex items-center justify-center ease-out duration-200 text-dark hover:text-blue absolute top-4 lg:top-6 right-4 lg:right-6 z-50"
                    >
                      <Fullscreen />
                    </button>

                    {data?.images && <Image
                      src={data?.images[previewImg]}
                      alt={data.title}
                      width={400}
                      height={400}
                    />}
                  </div>
                </div>

                {/* ?  &apos;border-blue &apos; :  &apos;border-transparent&apos; */}
                <div className="flex flex-wrap sm:flex-nowrap gap-4.5 mt-6">
                  {data.images.map((item, key) => (
                    <button
                      onClick={() => setPreviewImg(key)}
                      key={key}
                      className={`flex items-center justify-center w-15 sm:w-25 h-15 sm:h-25 overflow-hidden rounded-lg bg-gray-2 shadow-1 ease-out duration-200 border-2 hover:border-blue ${key === previewImg
                        ? "border-blue"
                        : "border-transparent"
                        }`}
                    >
                      <Image
                        width={50}
                        height={50}
                        src={item}
                        alt="thumbnail"
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* <!-- product content --> */}
              <div className="max-w-[539px] w-full">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-xl sm:text-2xl xl:text-custom-3 text-dark">
                    {data.title}
                  </h2>

                  <div className="inline-flex font-medium text-custom-sm text-white bg-blue rounded py-0.5 px-2.5">
                    {calculateDiscountPercentage(data.price, data.discountedPrice)}% OFF
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-5.5 mb-4.5">
                  <div className="flex items-center gap-2.5">
                    {/* <!-- stars --> */}
                    <Reviews averageRating={data.averageRating} reviewCount={false} />

                    <span> ({data.reviewCount} customer reviews) </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <CircleCheck
                      className={data?.stock > 0 ? "text-green-600" : "text-red-500"}
                    />

                    <span
                      className={`text-sm font-medium ${data?.stock > 0 ? "text-green-600" : "text-red-500"
                        }`}
                    >
                      {data?.stock > 0 ? `${data.stock} In Stock` : "Out of Stock"}
                    </span>


                  </div>
                </div>

                <h3 className="font-medium text-custom-1 mb-4.5">
                  <span className="text-sm sm:text-base text-dark">
                    Price: ₹{data.discountedPrice.toLocaleString()}
                  </span>
                  <span className="line-through ms-1">
                    {"  "}
                    ₹{data.price.toLocaleString()}{" "}
                  </span>
                </h3>

                <ul className="flex flex-col gap-2">
                  <li className="flex items-center gap-2.5">
                    <CircleCheck size={'1.3rem'} className="text-blue" />
                    Free delivery available
                  </li>

                  <li className="flex items-center gap-2.5">
                    <CircleCheck size={'1.3rem'} className="text-blue" />
                    Cash on delivery available
                  </li>
                </ul>

                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="flex flex-col mb-9">
                    <ProductSpecifications specifications={data?.specifications} />

                  </div>

                  <div className="flex flex-wrap items-center gap-4.5">
                    <div className="flex items-center rounded-md border border-gray-3">
                      <button
                        aria-label="button for remove product"
                        className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                        onClick={() =>
                          quantity > 1 && setQuantity(quantity - 1)
                        }
                      >
                        <Minus />
                      </button>

                      <span className="flex items-center justify-center w-16 h-12 border-x border-gray-4">
                        {quantity}
                      </span>

                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        aria-label="button for add product"
                        className="flex items-center justify-center w-12 h-12 ease-out duration-200 hover:text-blue"
                      >
                        <Plus />
                      </button>
                    </div>

                    <button
                      className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                      onClick={handleBuyNow}>
                      Buy Now
                    </button>

                    <a
                      href="#"
                      className="flex items-center justify-center w-12 h-12 rounded-md border border-gray-3 ease-out duration-200 hover:text-white hover:bg-dark hover:border-transparent"
                    >
                      <svg
                        className="fill-current"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M5.62436 4.42423C3.96537 5.18256 2.75 6.98626 2.75 9.13713C2.75 11.3345 3.64922 13.0283 4.93829 14.4798C6.00072 15.6761 7.28684 16.6677 8.54113 17.6346C8.83904 17.8643 9.13515 18.0926 9.42605 18.3219C9.95208 18.7366 10.4213 19.1006 10.8736 19.3649C11.3261 19.6293 11.6904 19.75 12 19.75C12.3096 19.75 12.6739 19.6293 13.1264 19.3649C13.5787 19.1006 14.0479 18.7366 14.574 18.3219C14.8649 18.0926 15.161 17.8643 15.4589 17.6346C16.7132 16.6677 17.9993 15.6761 19.0617 14.4798C20.3508 13.0283 21.25 11.3345 21.25 9.13713C21.25 6.98626 20.0346 5.18256 18.3756 4.42423C16.7639 3.68751 14.5983 3.88261 12.5404 6.02077C12.399 6.16766 12.2039 6.25067 12 6.25067C11.7961 6.25067 11.601 6.16766 11.4596 6.02077C9.40166 3.88261 7.23607 3.68751 5.62436 4.42423ZM12 4.45885C9.68795 2.39027 7.09896 2.1009 5.00076 3.05999C2.78471 4.07296 1.25 6.42506 1.25 9.13713C1.25 11.8027 2.3605 13.8361 3.81672 15.4758C4.98287 16.789 6.41022 17.888 7.67083 18.8586C7.95659 19.0786 8.23378 19.2921 8.49742 19.4999C9.00965 19.9037 9.55954 20.3343 10.1168 20.66C10.6739 20.9855 11.3096 21.25 12 21.25C12.6904 21.25 13.3261 20.9855 13.8832 20.66C14.4405 20.3343 14.9903 19.9037 15.5026 19.4999C15.7662 19.2921 16.0434 19.0786 16.3292 18.8586C17.5898 17.888 19.0171 16.789 20.1833 15.4758C21.6395 13.8361 22.75 11.8027 22.75 9.13713C22.75 6.42506 21.2153 4.07296 18.9992 3.05999C16.901 2.1009 14.3121 2.39027 12 4.45885Z"
                          fill=""
                        />
                      </svg>
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="overflow-hidden bg-gray-2 py-20">
          <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
            {/* <!--== tab header start ==--> */}
            <div className="flex flex-wrap items-center bg-white rounded-[10px] shadow-1 gap-5 xl:gap-12.5 py-4.5 px-4 sm:px-6">
              {tabs.map((item, key) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(item.id)}
                  className={`font-medium lg:text-lg ease-out duration-200 hover:text-blue relative before:h-0.5 before:bg-blue before:absolute before:left-0 before:bottom-0 before:ease-out before:duration-200 hover:before:w-full ${activeTab === item.id
                    ? "text-blue before:w-full"
                    : "text-dark before:w-0"
                    }`}
                >
                  {item.title}
                </button>
              ))}
            </div>
            {/* <!--== tab header end ==--> */}
            <div>
              <div
                className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${activeTab === "tabOne" ? "flex" : "hidden"
                  }`}
              >
                <div className="max-w-[670px] w-full">
                  <h2 className="font-medium text-2xl text-dark mb-7">
                    Description
                  </h2>

                  <p className="mb-6">
                    {data.description}
                  </p>

                </div>

                <div className="max-w-[447px] w-full">
                  <h2 className="font-medium text-2xl text-dark mb-7">
                    Care & Maintenance:
                  </h2>

                  <p className="mb-6">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the
                    industry&apos;s standard dummy text ever since the 1500s,
                    when an unknown printer took a galley of type and
                    scrambled it to make a type specimen book.
                  </p>
                  <p>
                    It has survived not only five centuries, but also the leap
                    into electronic typesetting, remaining essentially
                    unchanged. It was popularised in the 1960s.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- tab content one end --> */}

            {/* <!-- tab content two start --> */}
            <div>
              <div
                className={`rounded-xl bg-white shadow-1 p-4 sm:p-6 mt-10 ${activeTab === "tabTwo" ? "block" : "hidden"
                  }`}
              >

                {
                  specs && specs?.map((item, i) => (
                    <div key={`specification_${i}`} className="rounded-md even:bg-gray-1 flex py-4 px-4 sm:px-5">
                      <div className="max-w-[450px] min-w-[140px] w-full">
                        <p className="text-sm sm:text-base text-dark">{item.label}</p>
                      </div>
                      <div className="w-full">
                        <p className="text-sm sm:text-base text-dark">{item.value}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>
            {/* <!-- tab content two end --> */}

            {/* <!-- tab content three start --> */}
            <div>
              <div
                className={`flex-col sm:flex-row gap-7.5 xl:gap-12.5 mt-12.5 ${activeTab === "tabThree" ? "flex" : "hidden"
                  }`}
              >
                <div className="max-w-[570px] w-full">
                  <h2 className="font-medium text-2xl text-dark mb-9">
                    {reviews && reviews?.data?.length} Review for this product
                  </h2>

                  <div className="flex flex-col gap-6">
                    {
                      reviews && reviews?.data?.map(item => (
                        <div key={item?._id} className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                          <div className="flex items-center justify-between">
                            <a href="#" className="flex items-center gap-4">
                              <Avatar name={`${item?.user?.firstName} ${item?.user?.lastName}`} />

                              <div>
                                <h3 className="font-medium text-dark">
                                  {`${item.user.firstName} ${item.user.lastName}`}
                                </h3>
                                <p className="text-custom-sm">
                                  Buyer
                                </p>
                              </div>
                            </a>

                            <Reviews averageRating={item.rating} reviewCount={false}></Reviews>
                          </div>

                          <p className="text-dark mt-6">
                            “{item?.comment}’’
                          </p>
                        </div>
                      ))
                    }
                  </div>
                </div>

                <div className="max-w-[550px] w-full">
                  <form onSubmit={handleSubmitReview} ref={formRef}>
                    <h2 className="font-medium text-2xl text-dark mb-3.5">
                      Add a Review
                    </h2>

                    <p className="mb-6">
                      Your email address will not be published. Required
                      fields are marked *
                    </p>



                    {session ? (<div className="rounded-xl bg-white shadow-1 p-4 sm:p-6">
                      <div className="mb-5">
                        <label htmlFor="comment" className="block mb-2.5">
                          Comments
                        </label>

                        <textarea
                          name="comment"
                          id="comment"
                          rows={5}
                          placeholder="Your comments"
                          className="rounded-md border border-gray-3 bg-gray-1 placeholder:text-dark-5 w-full p-5 outline-none duration-200 focus:border-transparent focus:shadow-input focus:ring-2 focus:ring-blue/20"
                        ></textarea>

                        <span className="flex items-center justify-between mt-2.5">
                          <span className="text-custom-sm text-dark-4">
                            Maximum
                          </span>
                          <span className="text-custom-sm text-dark-4">
                            250
                          </span>
                        </span>
                      </div>

                      <div className="flex flex-col lg:flex-row gap-5 sm:gap-7.5 mb-5.5">
                        Rating <StarRating value={review?.rating} onChange={handleSetReview} />
                      </div>

                      <button
                        type="submit"
                        className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                      >
                        Submit Reviews
                      </button>
                    </div>) :(
                        <div className="bg-white p-5 rounded-lg shadow-sm ">
                          <h3 className="mb-3 text-lg">Signin or create account to add your review</h3>
                          <Link
                            href="/signin"
                            className="inline-flex font-medium text-white bg-blue py-3 px-7 rounded-md ease-out duration-200 hover:bg-blue-dark"
                          >
                            Sign In
                          </Link>
                        </div>
                    )}
                  </form>
                </div>
              </div>
            </div>
            {/* <!-- tab content three end --> */}
            {/* <!--== tab content end ==--> */}
          </div>
        </section>

        <RecentlyViewdItems />

        <Newsletter />
      </>
      {/* )} */}
    </>
  );
};

export default ShopDetails;
