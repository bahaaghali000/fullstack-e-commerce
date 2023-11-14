import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const exsitingItem = state.cartItems.find(
        (item) => item.id === newItem.id
      );
      state.totalQuantity++;
      if (!exsitingItem) {
        state.cartItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
        });

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + +item.price * +item.quantity,
          0
        );
      } else {
        exsitingItem.quantity++;
        exsitingItem.totalPrice = +exsitingItem.totalPrice + +newItem.price;

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + +item.price * +item.quantity,
          0
        );
      }
    },

    deleteItem: (state, action) => {
      const id = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        state.totalQuantity = state.totalQuantity - existingItem.quantity;

        state.totalAmount = state.cartItems.reduce(
          (total, item) => total + +item.price * +item.quantity,
          0
        );
      }
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
