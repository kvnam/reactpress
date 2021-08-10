import React, { useEffect, useState } from "react";
import { useRPDispatch, useRPSelector } from "../../store/store";

import { WPPage } from "../../types/wptypes";
import { AllPagesType } from "../../types/pages.types";
import * as actionMethods from "../../store/actions/index.actions";

type RPPage = {
  [key: string]: WPPage;
};

const useWPPages = () => {
  const pagesState: AllPagesType = useRPSelector((state: any) => state.pagesRed);
  const [pages, setPages] = useState({});

  const dispatch = useRPDispatch();

  useEffect(() => {
    dispatch(actionMethods.getAllPages());
  }, []);

  useEffect(() => {
    if (!pagesState?.pages?.length) {
      return;
    }
    const { pages: pagesData = [] } = pagesState;
    const updatedPages: RPPage = {};

    pagesData.forEach((page: WPPage) => {
      updatedPages[page.slug] = { ...page };
    });
    setPages(updatedPages);
  }, [pagesState]);

  return {
    pagesLoading: pagesState.pagesLoading,
    pages,
  };
};

export default useWPPages;
