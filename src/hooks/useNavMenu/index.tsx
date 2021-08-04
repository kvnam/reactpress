import React, { useEffect, useState } from "react";

import useWPPages from "../useWPPages";
import { AllPagesType } from '../../types/pages.types';

type NavItemType = {
  link: string;
  linkName: string;
  isVisible: string;
}

const baseNavItems: NavItemType[] = [
  {
    link: "/",
    linkName: "BLOG",
    isVisible: "all",
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
];

const useNavMenu = () => {
  const wpPages: AllPagesType = useWPPages();
  const [navItems, setNavItems] = useState([...baseNavItems]);
  
  useEffect(() => {
    if (!wpPages || (navItems.length === baseNavItems.length + Object.keys(wpPages?.pages || {}).length)) {
      return;
    }
    const { pages = {} } = wpPages;
    const updatedNavItems: Array<NavItemType> = [...navItems];
    const slugsInNavItems: Array<string> = updatedNavItems.map(item => item.link);
    
    for(const pageSlug in pages){
      if(!slugsInNavItems.includes(`/${pageSlug}`)){
        updatedNavItems.push({
          link: `/${pageSlug}`,
          linkName: pages[pageSlug].title.rendered,
          isVisible: "noauth",
        });
        slugsInNavItems.push(`/${pageSlug}`);
      }
    }
    setNavItems(updatedNavItems);
  }, [wpPages]);

  return navItems;
};

export default useNavMenu;
