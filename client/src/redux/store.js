import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";
import authSlice from "./slices/authSlice";
import productsSlice from "./slices/productsSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    cart: cartSlice,
    fav: favSlice,
    products: productsSlice,
  },
});

export default store;
