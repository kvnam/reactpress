import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/index";
import type {
  GetAllPostsAction,
  LoadingPostsAction,
  GetSinglePostAction,
  SearchPostsAction,
} from "@rptypes/posts.types";

const initialState = {
  posts: null,
  error: null,
  singlePost: null,
  totalPages: 0,
  totalPosts: 0,
  perPage: 5,
  postsLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    LOADING_ALL_POSTS: (state, action: PayloadAction<LoadingPostsAction>) => {
      state.postsLoading = !!action.payload.postsLoading;
    },
    GET_ALL_POSTS: (state, action: PayloadAction<GetAllPostsAction>) => {
      state.postsLoading = false;
      state.posts = action.payload.posts || null;
      state.error = action.payload.error;
    },
    SINGLE_POST_ACTION: (state, action: PayloadAction<GetSinglePostAction>) => {
      state.postsLoading = false;
      state.singlePost = action.payload.post || null;
      state.error = action.payload.error;
    },
    SEARCH_POSTS_ACTION: (state, action: PayloadAction<SearchPostsAction>) => {
      state.postsLoading = false;
      state.posts = action.payload.posts || null;
      state.error = action.payload.error;
    },
  },
});

export const getAllPostsState = (state: RootState) => state.postsRed;

export default postsSlice.reducer;
