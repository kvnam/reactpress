import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WPPage } from "../../types/wptypes";
import { AllPagesType } from "../../types/pages.types";
import * as actionMethods from "../../store/actions/index.actions";

type RPPage = {
  [key: string]: WPPage;
};

const useWPPages = () => {
  const pagesState: AllPagesType = useSelector((state: any) => state.pagesRed);
  const [pages, setPages] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actionMethods.getAllPages());
  }, []);

  useEffect(() => {
    if (!pagesState?.pages?.length) {
      return;
    }
    const { pages: pagesData = [] } = pagesState;
    const updatedPages: RPPage = {};
    for (const page of pagesData) {
      updatedPages[page.slug] = { ...page };
    }
    setPages(updatedPages);
  }, [pagesState]);

  return {
    pagesLoading: pagesState.pagesLoading,
    pages,
  };
};

export default useWPPages;
