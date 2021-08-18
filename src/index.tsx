import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import UserReducer from "./store/slices/users.slice";
import PostReducer from "./store/slices/posts.slice";
import PagesReducer from "./store/slices/pages.slice";
import "./index.css";
import App from "./App";

const appStore = configureStore({
  reducer: {
    // users: UserReducer,
    posts: PostReducer,
    pages: PagesReducer,
  },
});
export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;

const app = (
  <BrowserRouter>
    <Provider store={appStore}>
      <App />
    </Provider>
  </BrowserRouter>
);

ReactDOM.render(app, document.getElementById("root"));
