import { configureStore } from "@reduxjs/toolkit";

import cartSlice from "./slices/cartSlice";
import favSlice from "./slices/favSlice";
import productSlice from "./slices/updateProduct";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    fav: favSlice,
    product: productSlice,
  },
});

export default store;
