import {
  LOADING_ALL_POSTS,
  GET_ALL_POSTS,
  SINGLE_POST_ACTION,
  SEARCH_POSTS_ACTION,
  PostActionTypes,
} from "../../types/posts.types";

export const initialPostState = {
  posts: null,
  error: null,
  singlePost: null,
  totalPages: 0,
  totalPosts: 0,
  perPage: 5,
  postsLoading: false,
};

const postsReducer = (state = initialPostState, action: PostActionTypes) => {
  let newState = state;

  switch (action.type) {
    case LOADING_ALL_POSTS:
      newState = {
        ...state,
        postsLoading: action.postsLoading,
      };
      break;
    case GET_ALL_POSTS:
      newState = {
        ...state,
        posts: action.posts || null,
        postsLoading: false,
        error: action.error,
      };
      break;
    case SINGLE_POST_ACTION:
      newState = {
        ...state,
        singlePost: action.post,
        postsLoading: action.postsLoading,
        error: action.error,
      };
      break;
    case SEARCH_POSTS_ACTION:
      newState = {
        ...state,
        posts: action.posts,
        postsLoading: action.postsLoading,
        error: action.error,
      };
      break;
    default:
      break;
  }
  return newState;
};

export default postsReducer;
