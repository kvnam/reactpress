import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { userSignup, userSignin, validateToken, userSignout } from "@store/actions/users.actions";
import { UserSignInAction, ValidateUserAction, UserSignoutAction, UserSignUpAction } from "@rptypes/users.types";

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

    builder.addCase(userSignin.fulfilled, (state, action: PayloadAction<UserSignInAction>) => {
      const { user = {} } = action.payload;
      state.userLoading = false;
      state.username = user.username || "";
      state.email = user.email || "";
      state.displayname = user.displayname || "";
      state.token = action.payload.token || "";
      state.error = action.payload.error;
    });

    builder.addCase(validateToken.fulfilled, (state, action: PayloadAction<ValidateUserAction>) => {
      state.token = action.payload.token || "";
      state.email = action.payload.email || "";
      state.redirectURL = action.payload.redirectTo || "";
      state.error = action.payload.error;
    });

    builder.addCase(userSignout.fulfilled, (state, action: PayloadAction<UserSignoutAction>) => {
      if (action.payload.status) {
        state.token = "";
        state.email = "";
        state.redirectURL = "";
      } else {
        state.error = action.payload.error;
      }
    });
  },
});

export default usersSlice.reducer;
