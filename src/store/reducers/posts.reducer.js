const initialState = {
  posts: null,
  error: null,
  singlePost: null,
  totalPages: 0,
  totalPosts: 0,
  perPage: 5
};

const postsReducer = (state = initialState, action) => {
  let newState = null;
  switch(action.type){
    case "GET_ALL_POSTS": newState = {
                            ...state,
                            posts: action.posts
                          };
                          return newState;
    case "GET_ALL_POSTS_FAIL": newState = {
                                ...state,
                                error: action.error
                              };
                              return newState;
    case "SINGLE_POST_SUCCESS": newState = {
                                  ...state,
                                  singlePost: action.post
                                };
                                return newState;
    case "SINGLE_POST_FAIL": newState = {
                                  ...state,
                                  error: action.error
                                };
                                return newState;
    case "SEARCH_POSTS_SUCCESS" : newState = {
                                  ...state,
                                  posts: action.posts
                                };
                                return newState;
    case "SEARCH_POSTS_FAIL": newState = {
                                  ...state,
                                  error: action.error
                                };
                                return newState;
    default: return state;
  }
};

export default postsReducer;