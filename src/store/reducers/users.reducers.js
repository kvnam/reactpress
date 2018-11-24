import * as actionMethods from '../actions/actions';

const initialState = {
  userInfo: {
    username: '',
    email: '',
    displayname: ''
  },
  token: '',
  error: null,
  isLoading: false,
  redirectURL: '/'
};

const userReducer = (state = initialState, action) => {
  let updatedUser = null;
  switch(action.type){
    case actionMethods.USER_SIGNUP: updatedUser = {
                          ...state,
                          isLoading: true
                        };
                        return updatedUser;
    case actionMethods.USER_SIGNUP_SUCCESS: updatedUser = {
                          ...state,
                          isLoading: false,
                          username: action.user.username,
                          email: action.user.email,
                          token: action.token,
                          displayname: action.user.displayname,
                          redirectURL: '/signin?user=new'
                        };
                        return updatedUser;
    case actionMethods.USER_SIGNUP_FAIL: updatedUser = {
                          ...state,
                          isLoading: false,
                          error: action.error
                        };
                        return updatedUser;
    case actionMethods.USER_SIGNIN: updatedUser = {
                          ...state,
                          isLoading: true
                        };
                        return updatedUser;
    case actionMethods.USER_SIGNIN_SUCCESS: updatedUser = {
                          ...state,
                          isLoading: false,
                          userInfo: action.userDets,
                          token: action.token
                        };
                        return updatedUser;
    case actionMethods.USER_SIGNIN_FAIL: updatedUser = {
                          ...state,
                          isLoading: false,
                          error: action.error
                        };
                        return updatedUser;
    case actionMethods.VALIDATE_TOKEN_SUCCESS: updatedUser = {
                                ...state,
                                token: action.token,
                                email: action.email,
                                redirectURL: action.redirectTo
                              };
                              return updatedUser;
    case actionMethods.VALIDATE_TOKEN_FAIL: updatedUser = {
                                ...state,
                                error: action.error
                              };
                              return updatedUser;
    case actionMethods.USER_SIGNOUT:console.log('IN SIGNOUT REDUCER');
                                    localStorage.removeItem('token');
                                    localStorage.removeItem('email');
                                    updatedUser = {
                                      ...state,
                                      token: null,
                                      redirectURL: '/'
                                    };
                                    return updatedUser;
    default : return state;
  }
}

export default userReducer;