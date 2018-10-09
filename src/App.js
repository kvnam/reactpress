import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';

import Navigation from './containers/Navigation/Navigation';
import Blog from './containers/Blog/Blog';
import SinglePost from './components/Post/SinglePost';
import './App.css';

class App extends Component {
  render() {
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
        <Route path="/auth" exact render={() => <div>Signin Data</div>} />
        <Route path="/" exact component={Blog}/>
       </AnimatedSwitch>
      </div>
    );
  }
}

export default App;
