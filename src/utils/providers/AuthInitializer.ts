"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { setCartFromBackend } from "@/redux/features/cart-slice";
import { AddToCartPayload, cartService } from "../services/cart.service";
import { getGuestCart } from "@/redux/thunks/cart.thunks";

const AuthInitializer = () => {
  const dispatch = useDispatch();
  const { status } = useSession();

  useEffect(() => {
    if (status === "loading") return;

    const syncCart = async () => {
      try {
        // 🧑‍💻 GUEST USER
        if (status !== "authenticated") {
          const guestCart = getGuestCart();
          dispatch(setCartFromBackend(guestCart));
          return;
        }

        // 🔐 LOGGED IN USER
        const guestCart = getGuestCart();

        let res;
        if (guestCart.length > 0) {
          // 🔥 MERGE
          const formatedGuestCart:AddToCartPayload[] = guestCart?.map(item=>({productId: item.id, quantity: item.quantity}))
          res = await cartService.mergeCart({items:formatedGuestCart});
          localStorage.removeItem("cart");
        } else {
          res = await cartService.getCart();
        }

        console.log('res===>', res)

        dispatch(setCartFromBackend(res.data.items));
      } catch (err) {
        console.error("Cart sync failed", err);
      }
    };

    syncCart();
  }, [status, dispatch]);

  return null;
};

export default AuthInitializer;

// const AuthInitializer = () => {
//   const dispatch = useDispatch();
//   const { data: session, status } = useSession();

//   const token = session?.accessToken;

//   useEffect(() => {
//     if (status !== "authenticated" || !token) {
//       const carts = localStorage.getItem('cart') && JSON.parse(localStorage.getItem('cart'));

//       if (carts) dispatch(setCartFromBackend(carts));

//     } else {
//       cartService
//         .getCart()
//         .then((res) => {
//           dispatch(setCartFromBackend(res.data.items));
//         })
//         .catch(console.error);
//     };
//   }, [status, token, dispatch]);

//   return null;
// };

// export default AuthInitializer;
