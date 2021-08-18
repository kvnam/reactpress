import React, { useEffect, useState } from "react";
import { useRPDispatch, useRPSelector } from "@store/store";

import { WPPage } from "@rptypes/wptypes";
import { AllPagesType } from "@rptypes/pages.types";
import { getAllPages } from "@store/actions/pages.actions";
import { RootState } from "@/index";

type RPPage = {
  [key: string]: WPPage;
};

const useWPPages = () => {
  const pagesState: AllPagesType = useRPSelector((state: RootState) => state.pages);
  const [pages, setPages] = useState({});

  const dispatch = useRPDispatch();

  useEffect(() => {
    dispatch(getAllPages());
  }, []);

  useEffect(() => {
    if (!pagesState?.pages?.length || (pagesState?.pages?.length && Object.keys(pages).length)) {
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
