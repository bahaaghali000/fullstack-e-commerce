import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prodcutToUpdate: {},
};

const productSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      const product = action.payload;
      state.prodcutToUpdate = product;
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
