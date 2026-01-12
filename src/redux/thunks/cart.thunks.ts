import { AppDispatch, RootState } from "../store";
import { CartItem } from "../features/cart-slice";
import {
  addItemToCartLocal,
  setCartFromBackend,
} from "../features/cart-slice";
import { cartService } from "@/utils/services/cart.service";

const getGuestCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];
  return JSON.parse(localStorage.getItem("cart") || "[]");
};

const setGuestCart = (cart: CartItem[]) => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const addItemToGuestCart = (item: CartItem) => {
  const cart = getGuestCart();

  const existing = cart?.find((i) => i.id === item.id);

  if (existing) {
    existing.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  setGuestCart(cart);
  return cart;
};

export const addToCart =
  (item: CartItem) =>
  async (dispatch: AppDispatch, getState: () => RootState) => {

    // 1. Optimistic UI update
    dispatch(addItemToCartLocal(item));

    const { session } = getState().auth; 

    // 2. Logged-in user
    if (session) {
      try {
        const { data } = await cartService.addToCart({
          productId: item.id,
          quantity: item.quantity,
        });

        dispatch(setCartFromBackend(data.items));
      } catch (error) {
        console.error("Cart sync failed", error);
        // OPTIONAL: rollback here
      }
    }
    // 3. Guest user
    else {
      addItemToGuestCart(item);
    }
  };
