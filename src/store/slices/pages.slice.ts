import { createSlice } from "@reduxjs/toolkit";

import type { RootState } from "../../index";

const initialState = {
  pages: null,
  pagesLoading: false,
};

export const pagesSlice = createSlice({
  name: "pagesRed",
  initialState,
  reducers: {
    GET_ALL_PAGES: (state, action) => {
      state.pages = action.payload.pages;
      state.pagesLoading = !!action.payload.pagesLoading;
    },
  },
});

export const { GET_ALL_PAGES } = pagesSlice.actions;

export const getAllPagesState = (state: RootState) => state.pagesRed;

export default pagesSlice.reducer;
