"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setCartFromBackend } from "@/redux/features/cart-slice";
import { cartService } from "../services/cart.service";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();

  const token = session?.accessToken;

  useEffect(() => {
    if (status !== "authenticated" || !token) {
      const carts = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));

      if (carts) dispatch(setCartFromBackend(carts));

    } else {
      cartService
        .getCart()
        .then((res) => {
          dispatch(setCartFromBackend(res.data.items));
        })
        .catch(console.error);
    };
  }, [status, token, dispatch]);

  return null;
};

export default AuthInitializer;
