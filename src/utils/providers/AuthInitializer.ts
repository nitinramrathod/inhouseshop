"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setCartFromBackend } from "@/redux/features/cart-slice";
import { cartService } from "../services/cart.service";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { data: session, status } = useSession();
  const hasFetchedCart = useRef(false);


  const token = session?.accessToken;

  useEffect(() => {
    if (status !== "authenticated" || !token) return;
    if (hasFetchedCart.current) return;

    cartService
      .getCart()
      .then((res) => {
        dispatch(setCartFromBackend(res.data.items));
      })
      .catch(console.error);
  }, [status, token, dispatch]);

  return null;
};

export default AuthInitializer;
