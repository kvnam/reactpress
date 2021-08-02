import { ThunkAction, ThunkDispatch } from "redux-thunk";
import axiosOrig, { AxiosResponse } from "axios";
import axios from "../../axios-wp";

import { WPPage } from "../../types/wptypes";

export const getAllPages = () => {
    axios
      .get("/wp/v2/pages")
      .then((pagesRes: AxiosResponse) => {
        pagesRes.data.forEach((page: WPPage) => {
          // TODO: Add processing of page
        });
       
      });
    return [];
}