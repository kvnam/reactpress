import { WPUserType } from "./wptypes";

export const VALIDATE_TOKEN_ACTION = "VALIDATE_TOKEN_ACTION";
export const USER_SIGNUP_ACTION = "USER_SIGNUP_ACTION";
export const USER_SIGNIN_ACTION = "USER_SIGNIN_ACTION";
export const USER_SIGNOUT = "USER_SIGNOUT";
export const USER_SIGNOUT_ACTION = "USER_SIGNOUT_ACTION";
export const USER_LOADING_ACTION = "USER_LOADING_ACTION";

export type User = {
  username?: string;
  email?: string;
  displayname?: string;
};

interface LoadingUsersAction {
  type: typeof USER_LOADING_ACTION;
  userLoading: boolean;
}

interface UserSignUpAction {
  type: typeof USER_SIGNUP_ACTION;
  userLoading: boolean;
  user?: User;
  redirectURL?: string;
  error?: Error | any | null;
}

interface UserSignInAction {
  type: typeof USER_SIGNIN_ACTION;
  userLoading: boolean;
  user?: User;
  token?: string;
  error?: Error | any | null;
}

interface ValidateUserAction {
  type: typeof VALIDATE_TOKEN_ACTION;
  token?: string;
  email?: string;
  redirectTo?: string;
  error?: Error | any | null;
}

interface UserSignOutAction {
  type: typeof USER_SIGNOUT_ACTION;
}

export type UserActionTypes =
  | LoadingUsersAction
  | UserSignUpAction
  | UserSignInAction
  | ValidateUserAction
  | UserSignOutAction;
