import * as actionTypes from "../actions/actions";

const initialState = {
  username: "",
  email: "",
  displayname: "",
  token: "",
  error: null,
  isLoading: false,
  redirectURL: "/"
};

const userReducer = (state = initialState, action) => {
  let updatedUser = null;
  switch(action.type){
    case actionTypes.USER_SIGNUP: updatedUser = {
                          ...state,
                          isLoading: true
                        };
                        return updatedUser;
    case actionTypes.USER_SIGNUP_SUCCESS: updatedUser = {
                          ...state,
                          isLoading: false,
                          username: action.user.username,
                          email: action.user.email,
                          displayname: action.user.displayname,
                          redirectURL: "/signin?user=new"
                        };
                        return updatedUser;
    case actionTypes.USER_SIGNUP_FAIL: updatedUser = {
                          ...state,
                          isLoading: false,
                          error: action.error
                        };
                        return updatedUser;
    case actionTypes.USER_SIGNIN: updatedUser = {
                          ...state,
                          isLoading: true
                        };
                        return updatedUser;
    case actionTypes.USER_SIGNIN_SUCCESS: updatedUser = {
                          ...state,
                          isLoading: false,
                          username: action.userDets.user_nicename,
                          email: action.userDets.user_email,
                          displayname:  action.userDets.user_display_name,
                          token: action.token
                        };
                        return updatedUser;
    case actionTypes.USER_SIGNIN_FAIL: updatedUser = {
                          ...state,
                          isLoading: false,
                          error: action.error
                        };
                        return updatedUser;
    case actionTypes.VALIDATE_TOKEN_SUCCESS: 
                              
                              updatedUser = {
                                ...state,
                                token: action.token,
                                email: action.email,
                                redirectURL: action.redirectTo
                              };
                              return updatedUser;
    case actionTypes.VALIDATE_TOKEN_FAIL: updatedUser = {
                                ...state,
                                error: action.error
                              };
                              return updatedUser;
    case actionTypes.USER_SIGNOUT:
                                    updatedUser = {
                                      ...state,
                                      token: "",
                                      username: "",
                                      email: "",
                                      displayname: "",
                                      redirectURL: "/"
                                    };
                                    return updatedUser;
    default : return state;
  }
}

export default userReducer;