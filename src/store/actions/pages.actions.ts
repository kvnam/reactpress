import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import axios from "@/axios-wp";

import { GETALLPAGESACTION, GET_ALL_PAGES } from "@rptypes/pages.types";
import type { WPPage } from "@rptypes/wptypes";

export const getAllPagesAction = createAsyncThunk(GET_ALL_PAGES, async () => {
  return (): Promise<GETALLPAGESACTION> => {
    return axios.get("/wp/v2/pages").then((pagesRes: AxiosResponse) => {
      const finalPages: [WPPage?] = [];
      pagesRes.data.forEach((page: WPPage) => {
        // TODO: Add processing of page
        finalPages.push(page);
      });
      return { type: GET_ALL_PAGES, pages: finalPages, pagesLoading: false };
    });
  };
});

export const getPage = () => {
  return { type: "GET_PAGE", page: {}, pageLoading: false };
};
