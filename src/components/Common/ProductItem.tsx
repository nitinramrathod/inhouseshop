"use client";
import React from "react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCartLocal, setCartFromBackend } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import Rating from "./Rating";
import { eye_icon, while_heart_icon } from "@/assets/icons/common";
import { cartService } from "@/utils/services/cart.service";
import { useSession } from "next-auth/react";

const ProductItem = ({ item }: { item: Product }) => {
  const { openModal } = useModalContext();
   const { data: session} = useSession();

  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...item }));
  };

  // add to cart
  const handleAddToCart = async() => {
    dispatch(
      addItemToCartLocal({
        ...item,
        title: item.title,
        id: item._id,
        discountedPrice: item?.discountedPrice,
        image: item.images[0],
        quantity: 1,
      })
    );

    if (!session) return;

    try {
      const { data } = await cartService.addToCart({
        productId: item._id,
        quantity: 1,
      });

      dispatch(setCartFromBackend(data.items));
    } catch (err) {
      console.error("Cart sync failed", err);
    }
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        ...item,
        status: "available",
        quantity: 1,
      })
    );
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...item }));
  };

  const imageSRC =  item?.images?.length > 0 ? item?.images[0]: "https://example.com/test.png";

  return (
    <div className="group">
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[210px] mb-4">
       {imageSRC &&  <Image className="aspect-square object-cover" src={imageSRC} alt={item.title} width={210} height={210} />}

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2 pb-1 ease-linear duration-200 group-hover:translate-y-0">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            id="newOne"
            aria-label="button for quick view"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            {eye_icon}
          </button>

          <button
            onClick={() => handleAddToCart()}
            className="inline-flex font-medium text-custom-sm py-[7px] px-5 rounded-[5px] bg-blue text-white ease-out duration-200 hover:bg-blue-dark"
          >
            Add to cart
          </button>

          <button
            onClick={() => handleItemToWishList()}
            aria-label="button for favorite select"
            id="favOne"
            className="flex items-center justify-center w-9 h-9 rounded-[5px] shadow-1 ease-out duration-200 text-dark bg-white hover:text-blue"
          >
            {while_heart_icon}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        {/* <Rating rating={item?.rating}/>
        <p className="text-custom-sm">({item.reviews})</p> */}
      </div>

      <h3
        className="font-medium text-dark ease-out duration-200 hover:text-blue mb-1.5"
        onClick={() => handleProductDetails()}
      >
        <Link href={`/products/laptop/${item._id}`}> {item.title} </Link>
      </h3>

      <span className="flex items-center gap-2 font-medium text-lg">
        <span className="text-dark">₹{item.discountedPrice || item.price}/-</span>
        <span className="text-dark-4 line-through">₹{item.price}/-</span>
      </span>
    </div>
  );
};

export default ProductItem;
