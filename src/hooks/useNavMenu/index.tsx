import React, { useEffect, useState } from "react";

import useWPPages from "../useWPPages";
import { AllPagesType, NavItemType } from "../../types/pages.types";
import { WPPage } from "../../types/wptypes";
import { baseNavItems } from "../../commons/constants";

const useNavMenu = () => {
  const wpPages: AllPagesType = useWPPages();
  const [navItems, setNavItems] = useState([...baseNavItems]);

  useEffect(() => {
    if (!wpPages || navItems.length === baseNavItems.length + Object.keys(wpPages?.pages || {}).length) {
      return;
    }
    const { pages = {} } = wpPages;
    const pagesSlugs = Object.keys(pages);
    const updatedNavItems: Array<NavItemType> = [...navItems];
    const slugsInNavItems: Array<string> = updatedNavItems.map((item) => item.link);
    pagesSlugs.forEach((pageSlug: string) => {
      const page = pages[pageSlug];
      if (!slugsInNavItems.includes(`/${page.slug}`)) {
        updatedNavItems.push({
          link: `/${page.slug}`,
          linkName: page.title.rendered,
          isVisible: "noauth",
        });
        slugsInNavItems.push(`/${page.slug}`);
      }
    });
    setNavItems(updatedNavItems);
  }, [wpPages]);

  return navItems;
};

export default useNavMenu;
