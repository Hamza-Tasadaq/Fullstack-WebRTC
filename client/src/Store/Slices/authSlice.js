import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {
    activated: false,
  },
  otp: {
    phone: "",
    hash: "",
  },
};

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action) => {
      const { user } = action.payload;

      if (!user) {
        state.user = { activated: false };
      } else {
        state.user = user;
      }
    },
    setOTP: (state, action) => {
      const { phone, hash } = action.payload;
      state.otp.phone = phone;
      state.otp.hash = hash;
    },
  },
});

export const { setAuth, setUser, setOTP } = authSlice.actions;
export default authSlice.reducer;
