import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchCart = createAsyncThunk("/cart/fetch", async () => {
  const { data } = await axios.get(`/cart/get`);
  return data.data;
});

const initialState = {
  cartItems: [],
  totalAmount: 0,
  totalQuantity: 0,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.cartItems.find(
        (item) => item.product._id.toString() === newItem._id.toString()
      );

      if (!existingItem) {
        state.cartItems.push({
          product: {
            _id: newItem._id,
            productName: newItem.productName,
            imgUrl: newItem.imgUrl,
            price: newItem.price,
            category: newItem.category,
          },
          quantity: 1,
        });

        state.totalQuantity++;
        state.totalAmount += newItem.price;
      } else {
        existingItem.quantity++;

        state.totalAmount += existingItem.product.price;
      }
    },

    deleteItem: (state, action) => {
      const id = action.payload;

      const existingItem = state.cartItems.find(
        (item) => item.product._id.toString() === id.toString()
      );

      if (existingItem) {
        state.cartItems = state.cartItems.filter(
          (item) => item.product._id.toString() !== id.toString()
        );

        state.totalQuantity -= existingItem.quantity;

        state.totalAmount -= existingItem.product.price * existingItem.quantity;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.cartItems = action.payload.items || [];
        state.totalAmount = action.payload.totalAmount || 0;
        state.totalQuantity = action.payload.totalQuantity || 0;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;
