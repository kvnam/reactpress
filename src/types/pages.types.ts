import { WPPage } from './wptypes';

export const GET_ALL_PAGES = "GET_ALL_PAGES";

interface GETALLPAGESACTION {
    type: typeof GET_ALL_PAGES;
    pagesLoading: boolean;
    pages?: WPPage[] | any | null;
    error?: Error | any | null;
}

export type PAGEACTIONTYPES = GETALLPAGESACTION;