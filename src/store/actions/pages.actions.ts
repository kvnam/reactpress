import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axiosOrig, { AxiosResponse } from "axios";
import axios from "../../axios-wp";

import { PAGEACTIONTYPES, GET_ALL_PAGES } from "../../types/pages.types";
import { WPPage } from "../../types/wptypes";

export const getAllPages = (): ThunkAction<Promise<void>, {}, {}, PAGEACTIONTYPES> => {
  return (dispatch: ThunkDispatch<{}, {}, PAGEACTIONTYPES>): Promise<void> => {
    return axios.get("/wp/v2/pages").then((pagesRes: AxiosResponse) => {
      const finalPages: [WPPage?] = [];
      pagesRes.data.forEach((page: WPPage) => {
        // TODO: Add processing of page
        finalPages.push(page);
      });
      dispatch({ type: GET_ALL_PAGES, pages: finalPages, pagesLoading: false });
    });
  };
};

export const getPage = () => {
  return { type: "GET_PAGE", page: {}, pageLoading: false };
};
