import { LOADING_ALL_POSTS, GET_ALL_POSTS, SINGLE_POST_ACTION, SEARCH_POSTS_ACTION, PostActionTypes } from "../../types/posts.types";

export const initialPostState = {
  posts: null,
  error: null,
  singlePost: null,
  totalPages: 0,
  totalPosts: 0,
  perPage: 5,
};

const postsReducer = (state = initialPostState, action: PostActionTypes) => {
  let newState = null;

  switch (action.type) {
    case LOADING_ALL_POSTS:
      newState = {
        ...state,
        postsLoading: action.postsLoading,
      };
      return newState;
    case GET_ALL_POSTS:
      newState = {
        ...state,
        posts: action.posts,
        postsLoading: false,
        error: action.error,
      };
      return newState;
    case SINGLE_POST_ACTION:
      newState = {
        ...state,
        singlePost: action.post,
        postsLoading: action.postsLoading,
        error: action.error,
      };
      return newState;
    case SEARCH_POSTS_ACTION:
      newState = {
        ...state,
        posts: action.posts,
        postsLoading: action.postsLoading,
        error: action.error,
      };
      return newState;
    default:
      return state;
  }
};

export default postsReducer;
