import { ThunkAction, ThunkDispatch } from "redux-thunk";
import { AxiosResponse } from "axios";
import axios from "../../axios-wp";

import {
  USER_LOADING_ACTION,
  USER_SIGNUP_ACTION,
  USER_SIGNIN_ACTION,
  VALIDATE_TOKEN_ACTION,
  USER_SIGNOUT_ACTION,
  UserActionTypes,
  User,
} from "../../types/users.types";
import { WPUserType } from "../../types/wptypes";

export const userSignup = (user: User | WPUserType): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
    return axios
      .post("/wp/v2/users", user)
      .then((newUser: AxiosResponse<User>) => {
        const newUserData = newUser.data;
        dispatch({ type: USER_SIGNUP_ACTION, user: newUserData, userLoading: false });
      })
      .catch((error) => {
        dispatch({ type: USER_SIGNUP_ACTION, error, userLoading: false });
      });
  };
};

export const userSignin = (user: User | WPUserType): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
    return axios
      .post("/simple-jwt-authentication/v1/token", user)
      .then((response: AxiosResponse) => {
        const userDets = {
          username: response.data.user_nicename,
          email: response.data.user_email,
          displayname: response.data.user_display_name,
        };
        // Set token and email in local storage in case Redux data is lost
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.user_email);
        dispatch({ type: USER_SIGNIN_ACTION, user: userDets, token: response.data.token, userLoading: false });
      })
      .catch((err) => {
        dispatch({ type: USER_SIGNIN_ACTION, error: err, userLoading: false });
      });
  };
};

export const userSignout = (token: string): ThunkAction<Promise<void>, {}, {}, UserActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> => {
    return axios
      .post("/simple-jwt-authentication/v1/token/revoke", {}, { headers: { Authorization: "Bearer " + token } })
      .then((response) => {
        // Clear local storage
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        dispatch({ type: USER_SIGNOUT_ACTION, userLoading: false });
      })
      .catch((err) => {
        dispatch({ type: USER_SIGNOUT_ACTION, userLoading: false, error: err });
      });
  };
};

export const validateToken = (url: string): ThunkAction<Promise<void> | null, {}, {}, UserActionTypes> => {
  return (dispatch: ThunkDispatch<{}, {}, UserActionTypes>): Promise<void> | null => {
    let tokenVal: string | null = null,
      emailVal: string | null = null;
    if (localStorage.getItem("token")) {
      tokenVal = localStorage.getItem("token");
      emailVal = localStorage.getItem("email");
    }
    if (tokenVal && emailVal) {
      return axios
        .post("/simple-jwt-authentication/v1/token/validate", {}, { headers: { Authorization: "Bearer " + tokenVal } })
        .then((res) => {
          if (res.data.data.status === 200) {
            dispatch({ type: VALIDATE_TOKEN_ACTION, token: tokenVal || "", email: emailVal || "", redirectTo: url });
          }
        })
        .catch((err) => {
          // TODO: HANDLE VALIDATION ERROR
          dispatch({ type: VALIDATE_TOKEN_ACTION, error: err });
        });
    }
    return null;
  };
};
