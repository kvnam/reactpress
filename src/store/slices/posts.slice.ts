import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import type { RootState } from "@/index";
import type {
  GetAllPostsAction,
  LoadingPostsAction,
  GetSinglePostAction,
  SearchPostsAction,
} from "@rptypes/posts.types";
import { loadAllPosts, searchAllPosts, loadSinglePost } from "@store/actions/index.actions";

const initialState = {
  posts: null,
  error: null,
  post: null,
  totalPages: 0,
  totalPosts: 0,
  perPage: 5,
  postsLoading: false,
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loadAllPosts.fulfilled, (state, action: PayloadAction<GetAllPostsAction>) => {
      state.posts = action.payload.posts;
      state.postsLoading = false;
    });
    builder.addCase(searchAllPosts.fulfilled, (state, action: PayloadAction<SearchPostsAction>) => {
      state.posts = action.payload.posts;
      state.postsLoading = false;
    });
    builder.addCase(loadSinglePost.fulfilled, (state, action: PayloadAction<GetSinglePostAction>) => {
      state.post = action.payload.post;
      state.postsLoading = false;
    });
  },
});

export default postsSlice.reducer;
