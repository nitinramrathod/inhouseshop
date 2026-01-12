import { createSlice } from "@reduxjs/toolkit";

type AuthState = {
  session: any | null;
};

const initialState: AuthState = {
  session: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action) {
      state.session = action.payload;
    },
    clearSession(state) {
      state.session = null;
    },
  },
});

export const { setSession, clearSession } = authSlice.actions;
export default authSlice.reducer;
