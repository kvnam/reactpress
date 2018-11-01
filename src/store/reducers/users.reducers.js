const initialState = {
  username: '',
  email: '',
  token: '',
  displayname: '',
  error: null,
  isLoading: false,
  redirectURL: '/'
};

const userReducer = (state = initialState, action) => {
  let updatedUser = null;
  switch(action.type){
    case 'USER_SIGNUP': updatedUser = {
                          ...state,
                          isLoading: true
                        };
                        return updatedUser;
    case 'USER_SIGNUP_SUCCESS': updatedUser = {
                          ...state,
                          isLoading: false,
                          username: action.user.username,
                          email: action.user.email,
                          token: action.user.token,
                          displayname: action.user.displayname,
                          redirectURL: '/signin?user=new'
                        };
                        return updatedUser;
    case 'USER_SIGNUP_FAILURE': updatedUser = {
                          ...state,
                          isLoading: false,
                          error: action.error
                        };
                        return updatedUser;
    default : return state;
  }
}

export default userReducer;