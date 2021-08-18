import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/index";
import { GETALLPAGESACTION } from "@rptypes/pages.types";
import { getAllPages } from "@store/actions/index.actions";

const initialState = {
  pages: null,
  pagesLoading: false,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllPages.fulfilled, (state, action: PayloadAction<GETALLPAGESACTION>) => {
      state.pages = action.payload.pages;
      state.pagesLoading = false;
    });
  },
});

export default pagesSlice.reducer;
