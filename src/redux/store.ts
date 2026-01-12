import { configureStore } from "@reduxjs/toolkit";

import quickViewReducer from "./features/quickView-slice";
import cartReducer from "./features/cart-slice";
import wishlistReducer from "./features/wishlist-slice";
import purchaseReducer from "./features/purchase-slice";
import productDetailsReducer from "./features/product-details";
import auth from "./features/auth-slice";

import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    quickViewReducer,
    cartReducer,
    wishlistReducer,
    purchaseReducer,
    auth,
    productDetailsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
