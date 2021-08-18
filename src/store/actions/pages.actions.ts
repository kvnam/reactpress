import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios-wp";

import type { WPPage } from "@rptypes/wptypes";

export const getAllPages = createAsyncThunk("pages/getAllPages", async () => {
  const pagesRes = await axios.get("wp/v2/pages");
  if (pagesRes) {
    const finalPages: WPPage[] = [];
    pagesRes.data.forEach((page: WPPage) => {
      // TODO: Add processing of page
      finalPages.push(page);
    });
    return { pages: finalPages, pagesLoading: false };
  }
  return { pages: [], pagesLoading: false };
});

export const getPage = () => {
  return { type: "GET_PAGE", page: {}, pageLoading: false };
};
