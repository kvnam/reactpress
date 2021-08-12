import type { WPPage } from "./wptypes";

export const GET_ALL_PAGES = "GET_ALL_PAGES";

export type NavItemType = {
  link: string;
  linkName: string;
  isVisible: string;
  component?: string;
};

export type AllPagesType = {
  pagesLoading: boolean;
  pages?: WPPage[] | any | null;
  error?: Error | any | null;
};

export type RPPage = {
  [key: string]: WPPage;
};

export type RPPagesHookType = {
  pagesLoading?: boolean;
  pages: RPPage;
};

export interface GETALLPAGESACTION {
  type: typeof GET_ALL_PAGES;
  pagesLoading?: boolean;
  pages?: WPPage[] | any | null;
  error?: Error | any | null;
}
