import React, { useState, useEffect, ReactElement } from "react";
import DOMPurify from 'dompurify';
import { AnimatedSwitch } from "react-router-transition";

import Navigation from "./containers/Navigation/Navigation";
import Blog from "./containers/Blog/Blog";
import SinglePost from "./components/Post/SinglePost";
import Auth from "./containers/Auth/Auth";
import { Route } from "react-router-dom";

import useWPPages from "./hooks/useWPPages";
import WPPage from "./components/WPPage";
import { RPPagesHookType } from './types/pages.types';
import { baseNavItems } from "./commons/constants";
import "./App.css";

// TODO: Find a better solution
const getStaticComponent = (linkSlug: string) : ReactElement<any, any> => {
  let finalComp = <Blog />;
  switch(linkSlug) {
    case "/auth/signup": 
    case "/auth/signin": finalComp = <Auth />; break;
    case "/post" : finalComp = <SinglePost />; break;
    default: break;
  }

  return finalComp;
}

function App() {

  const wpPages: RPPagesHookType = useWPPages();
  const [wpRoutesList, setWPRoutesList] = useState<ReactElement<any, any>[] | null>(null);   // Separate state for Wordpress routes
  const [routes, setRoutes] = useState<ReactElement<any, any>[]>([]);   // Final React Router routes

  useEffect(() => {
    if(wpRoutesList?.length || wpPages?.pagesLoading){
      return;
    }
    const { pages } = wpPages || {};
    if(!Object.keys(pages).length){
      setWPRoutesList([]);  // No pages found
      return;
    }
    const pageSlugs = Object.keys(pages);
    const newRoutesList: ReactElement<any, any>[] = pageSlugs.map(slug => {
      const pageDetails = pages[slug];
      return <Route path={`/${slug}`} exact render={() => <WPPage><div dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(pageDetails.content.rendered)}} /></WPPage>} />;
    });
    setWPRoutesList(newRoutesList);
  }, [wpPages]);

useEffect(() => {
  if(!wpRoutesList){
    return;
  }
  const staticRoutes : ReactElement<any, any>[] = baseNavItems.map(item => <Route path={item.link} exact render={() => getStaticComponent(item.link)}/>); 
  const finalRoutesList = [...staticRoutes, ...wpRoutesList];
  setRoutes(finalRoutesList);
}, [wpRoutesList]);


  if(!routes?.length || wpPages?.pagesLoading){
    return <div>Loading...</div>;
  }
  
  return (
    <div className="App">
      <div>
        <Navigation />
      </div>
      <AnimatedSwitch atEnter={{ opacity: 0 }} atLeave={{ opacity: 0 }} atActive={{ opacity: 1 }} className="switch-wrapper">
        {routes}
      </AnimatedSwitch>
    </div>
  );
}

export default App;
