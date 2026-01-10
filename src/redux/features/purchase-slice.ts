import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BuyNowPayload = {
  type: "BUY_NOW" | string;
  id: string;
  title: string;
  price: number;
  discountedPrice: number;
  quantity: number;
  image?: string;
};

type PurchaseState = {
  buyNow: BuyNowPayload | null;
};

const initialState: PurchaseState = {
  buyNow: null,
};

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    setBuyNow: (state, action: PayloadAction<BuyNowPayload>) => {
      state.buyNow = action.payload;
    },

    clearBuyNow: (state) => {
      state.buyNow = null;
    },
  },
});

export const { setBuyNow, clearBuyNow } = purchaseSlice.actions;
export default purchaseSlice.reducer;
