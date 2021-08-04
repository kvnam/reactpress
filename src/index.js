import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { BrowserRouter } from "react-router-dom";
import UserReducer from "./store/reducers/users.reducers";
import PostReducer from "./store/reducers/posts.reducer";
import PagesReducer from "./store/reducers/pages.reducer";
import "./index.css";
import App from "./App.tsx";

const appReducer = combineReducers({
  usersRed: UserReducer,
  postsRed: PostReducer,
  pagesRed: PagesReducer,
});

const logger = (store) => {
  return (next) => {
    return (action) => {
      console.log("Middleware dispatching ");
      console.log(action);
      const result = next(action);
      console.log("Middleware next state ");
      console.log(store.getState());
      return result;
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const appStore = createStore(appReducer, composeEnhancers(applyMiddleware(logger, thunk)));

const app = (
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
