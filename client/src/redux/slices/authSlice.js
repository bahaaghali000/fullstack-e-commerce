import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    token: "",
    user: {},
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.token = "";
      state.user = {};
    },
  },
});

export const { setLogin, logout } = authSlice.actions;

export default authSlice.reducer;
