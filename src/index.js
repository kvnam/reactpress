import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import UserReducer from './store/reducers/users.reducers';
import PostReducer from './store/reducers/posts.reducer';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';

const appReducer = combineReducers({
  usersRed: UserReducer,
  postsRed: PostReducer
});

const logger = store => {
  return next => action => {
    console.log('[MIDDLEWARE] Action : ' + action);
    const res = next(action);
    console.log('[MIDDLEWARE] Result is : ' + store.getState());
    return res;
  }
};

const appStore = createStore(appReducer, compose(applyMiddleware(logger, thunk)));

const app = (
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
