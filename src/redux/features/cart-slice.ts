import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";


export const selectCartItems = (state: RootState) => state.cartReducer.items;

export const selectTotalPrice = createSelector([selectCartItems], (items) => { 
  console.log('====>', items) 
  return Array.isArray(items) ? items?.reduce((total, item) => {
    return total + item?.discountedPrice * item?.quantity;
  }, 0): [];  
});

export type CartItem = {
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
};

type InitialState = {
  items: CartItem[];
};

const initialState: InitialState = {
  items: [],
};

export const cart = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartFromBackend: (state, action: PayloadAction<CartItem[]>) => {

      console.log('action from setCartFromBackend==>', action.payload)
      state.items = action.payload;
    },

    addItemToCartLocal: (state, action: PayloadAction<CartItem>) => {
      console.log('state.items', state.items)
      const existing = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        existing.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    updateCartItemQuantityLocal: (
      state,
      action: PayloadAction<{ id: string; quantity: number }>
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.quantity = action.payload.quantity;
    },

    removeItemFromCartLocal: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    removeAllItemsFromCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItemToCartLocal,
  removeItemFromCartLocal,
  updateCartItemQuantityLocal,
  removeAllItemsFromCart,
  setCartFromBackend
} = cart.actions;
export default cart.reducer;
