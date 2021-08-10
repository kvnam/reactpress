import React from "react";
import ReactDOM from "react-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import UserReducer from "./store/reducers/users.reducers";
import PostReducer from "./store/reducers/posts.reducer";
import PagesReducer from "./store/reducers/pages.reducer";
import "./index.css";
import App from "./App";

const appStore = configureStore({
  reducer: {
    usersRed: UserReducer,
    postsRed: PostReducer,
    pagesRed: PagesReducer,
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
