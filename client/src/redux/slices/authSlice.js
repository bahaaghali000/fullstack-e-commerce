import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getProfile = createAsyncThunk("/getProfileInfo", async () => {
  const { data } = await axios.get("user/profile");

  return data.data;
});

const authSlice = createSlice({
  name: "auth",
  initialState: {
    loading: false,
    error: undefined,
    user: {},
    isAuthenticated: false,
  },
  reducers: {
    setLogin: (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = undefined;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setLogin, logout } = authSlice.actions;

export default authSlice.reducer;
