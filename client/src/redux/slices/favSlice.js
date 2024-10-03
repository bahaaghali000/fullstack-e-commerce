import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchFav = createAsyncThunk("/favorite/fetch", async () => {
  const { data } = await axios.get(`/favorite`);
  return data.data;
});

const initialState = {
  favItems: [],
  totalAmount: 0,
  totalFav: 0,
  loading: false,
  error: null,
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addItemToFav: (state, action) => {
      const newItem = action.payload;

      const exsitingItem = state.favItems.find(
        (item) => item._id.toString() === newItem._id.toString()
      );

      if (!exsitingItem) {
        state.favItems.push(newItem);
        state.totalFav++;

        state.totalAmount += newItem.price;
      }
    },

    deleteItemFromFav: (state, action) => {
      const id = action.payload;

      const existingItem = state.favItems.findIndex(
        (item) => item._id.toString() == id.toString()
      );

      if (existingItem > -1) {
        state.favItems.splice(existingItem, 1);

        state.totalFav--;

        state.totalAmount = state.favItems.reduce(
          (total, item) => total + +item.price,
          0
        );
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchFav.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFav.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.favItems = action.payload.items || [];
        state.totalFav = action.payload.totalQuantity || 0;
        state.totalAmount = action.payload.totalAmount || 0;
      })
      .addCase(fetchFav.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addItemToFav, deleteItemFromFav } = favSlice.actions;

export default favSlice.reducer;
