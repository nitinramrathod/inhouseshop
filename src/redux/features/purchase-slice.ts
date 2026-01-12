import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BuyNowPayload = {
  type: "BUY_NOW" | string;
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
}[];

type PurchaseState = {
  checkout: BuyNowPayload | null;
};

const initialState: PurchaseState = {
  checkout: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setCheckout: (state, action: PayloadAction<BuyNowPayload>) => {
      state.checkout = action.payload;
    },

    clearCheckout: (state) => {
      state.checkout = null;
    },
  },
});

export const { setCheckout, clearCheckout } = purchaseSlice.actions;
export default purchaseSlice.reducer;
