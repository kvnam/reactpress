import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/index";
import type { GETALLPAGESACTION } from "@rptypes/pages.types";
import { getAllPagesAction } from "@store/actions";

const initialState = {
  pages: null,
  pagesLoading: false,
};

export const pagesSlice = createSlice({
  name: "pagesRed",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPagesAction.fulfilled]: (state, action: PayloadAction<GETALLPAGESACTION>) => {
      state.pages = action.payload.pages;
      state.pagesLoading = !!action.payload.pagesLoading;
    },
  },
});

export const getAllPagesState = (state: RootState) => state.pagesRed;

export default pagesSlice.reducer;
