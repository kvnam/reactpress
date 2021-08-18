import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userSignup } from "@store/actions/users.actions";
import { UserSignInAction, ValidateUserAction, LoadingUsersAction, UserSignUpAction } from "@rptypes/users.types";

const initialState = {
  username: "",
  email: "",
  displayname: "",
  token: "",
  error: null,
  isLoading: false,
  redirectURL: "/",
  userLoading: false,
};

export const usersSlice = createSlice({
  initialState,
  name: "users",
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userSignup.fulfilled, (state, action: PayloadAction<UserSignUpAction>) => {
      const { user = {} } = action.payload;
      state.userLoading = action.payload.userLoading;
      state.username = user.username || "";
      state.email = user.email || "";
      state.displayname = user.displayname || "";
      state.redirectURL = "/signin?user=new";
      state.error = action.payload.error;
    });

    // []: (state, action: PayloadAction<LoadingUsersAction>) => {
    //   state.isLoading = action.payload.userLoading;
    // },
    // USER_SIGNUP_ACTION: (state, action: PayloadAction<UserSignUpAction>) => {
    //   const { user = {} } = action.payload;
    //   state.userLoading = action.payload.userLoading;
    //   state.username = user.username || "";
    //   state.email = user.email || "";
    //   state.displayname = user.displayname || "";
    //   state.redirectURL = "/signin?user=new";
    //   state.error = action.payload.error;
    // },
    // USER_SIGNIN_ACTION: (state, action: PayloadAction<UserSignInAction>) => {
    //   const { user = {} } = action.payload;
    //   state.userLoading = action.payload.userLoading;
    //   state.username = user.username || "";
    //   state.email = user.email || "";
    //   state.displayname = user.displayname || "";
    //   state.token = action.payload.token || "";
    //   state.error = action.payload.error;
    // },
    // VALIDATE_TOKEN_ACTION: (state, action: PayloadAction<ValidateUserAction>) => {
    //   state.token = action.payload.token || "";
    //   state.email = action.payload.email || "";
    //   state.redirectURL = action.payload.redirectTo || "";
    //   state.error = action.payload.error;
    // },
    // USER_SIGNOUT_ACTION: (state) => {
    //   state.token = "";
    //   state.username = "";
    //   state.email = "";
    //   state.displayname = "";
    //   state.redirectURL = "/";
    // },
  },
});

export default usersSlice.reducer;
