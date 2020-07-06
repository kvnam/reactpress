import React, { Component } from "react";
import { Route } from "react-router-dom";
import  { AnimatedSwitch } from "react-router-transition";

import Navigation from "./containers/Navigation/Navigation";
import Blog from "./containers/Blog/Blog";
import SinglePost from "./components/Post/SinglePost";
import Auth from "./containers/Auth/Auth";
import Dashboard from "./containers/Dashboard/Dashboard";
import "./App.css";

function App() {
    return (
      <div className="App">
       <div>
         <Navigation />
       </div>
       <AnimatedSwitch
        atEnter={{opacity: 0}}
        atLeave={{opacity: 0}}
        atActive={{opacity: 1}}
        className="switch-wrapper">
        <Route path="/post" exact component={SinglePost} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={Blog}/>
       </AnimatedSwitch>
      </div>
    );
}

export default App;
