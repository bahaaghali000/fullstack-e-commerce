import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk("/products/fetch", async () => {
  const { data } = await axios.get(`/api/products`);
  return data.data;
});

const initialState = {
  products: [],
  isLoading: false,
  error: null,
};
const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const product = action.payload;
      state.products.push(product);
    },
    removeProduct: (state, action) => {
      const id = action.payload;
      state.products = state.products.filter((product) => product._id !== id);
    },
    updateProduct: (state, action) => {
      const {
        id,
        category,
        description,
        photoBase64,
        price,
        productName,
        shortDesc,
      } = action.payload;

      const product = state.products.find((p) => product._id === id);
      product = {
        ...product,
        category,
        description,
        photoBase64,
        price,
        productName,
        shortDesc,
      };
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { removeProduct, addProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;

export const selectAllProducts = (state) => state.products;
