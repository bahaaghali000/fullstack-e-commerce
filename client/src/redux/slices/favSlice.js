import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favItems: [],
  totalAmount: 0,
  totalFav: 0,
};

const favSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToFav: (state, action) => {
      const newItem = action.payload;
      const exsitingItem = state.favItems.find(
        (item) => item.id === newItem.id
      );

      if (!exsitingItem) {
        state.totalFav++;
        state.favItems.push({
          id: newItem.id,
          productName: newItem.productName,
          imgUrl: newItem.imgUrl,
          price: newItem.price,
        });
        // state.favItems = [
        //   ...state.favItems,
        //   {
        //     id: newItem.id,
        //     productName: newItem.productName,
        //     imgUrl: newItem.imgUrl,
        //     price: newItem.price,
        //   },
        // ];

        state.totalAmount = state.favItems.reduce(
          (total, item) => total + +item.price,
          0
        );
      } else {
        console.log("it's the same product");
      }
    },

    deleteItemFromFav: (state, action) => {
      const id = action.payload;
      const existingItem = state.favItems.find((item) => item.id === id);

      if (existingItem) {
        state.totalFav--;
        state.favItems = state.favItems.filter((item) => item.id !== id);

        state.totalAmount = state.favItems.reduce(
          (total, item) => total + +item.price,
          0
        );
      }
    },
  },
});

export const { addItemToFav, deleteItemFromFav } = favSlice.actions;

export default favSlice.reducer;
