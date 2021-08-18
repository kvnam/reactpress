import { NavItemType } from "../types/pages.types";

export const baseNavItems: NavItemType[] = [
  {
    link: "/",
    linkName: "BLOG",
    isVisible: "all",
    component: "Blog",
  },
  {
    link: "/auth/signin",
    linkName: "LOG IN",
    isVisible: "noauth",
  },
  {
    link: "/auth/signup",
    linkName: "SIGN UP",
    isVisible: "noauth",
  },
  {
    link: "/post",
    linkName: "Post",
    isVisible: "all",
    component: "SinglePost",
  },
];

export const APP_NAME = "ReatPress";
