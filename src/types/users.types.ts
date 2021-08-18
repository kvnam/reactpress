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

export type LoadingUsersAction = {
  type: typeof USER_LOADING_ACTION;
  userLoading: boolean;
};

export type UserSignUpAction = {
  userLoading: boolean;
  user?: User;
  redirectURL?: string;
  error?: Error | any | null;
};

export type UserSignInAction = {
  userLoading: boolean;
  user?: User;
  token?: string;
  error?: Error | any | null;
};

export type ValidateUserAction = {
  token?: string;
  email?: string;
  redirectTo?: string;
  error?: Error | any | null;
};

export type UserSignoutAction = {
  status: boolean;
  error?: Error | any | null;
};
