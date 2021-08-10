import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "../../index";
import { PAGEACTIONTYPES, GET_ALL_PAGES } from "../../types/pages.types";

const initialState = {
  pages: null,
  pagesLoading: false,
};

export const pagesSlice = createSlice({
  name: "pages",
  initialState,
  reducers: {
    [GET_ALL_PAGES]: (state, action: PAGEACTIONTYPES) => {
      return {
        ...state,
        pages: action.pages,
        pagesLoading: action.pagesLoading,
      };
    },
  },
});

export const { GET_ALL_PAGES } = pagesSlice.actions;

export const getAllPages = (state: RootState) => state.pagesRed;

export default pagesSlice.reducer;
