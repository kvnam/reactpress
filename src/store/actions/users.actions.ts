import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/axios-wp";

import { User } from "@rptypes/users.types";
import { WPUserType } from "@rptypes/wptypes";

export const userSignup = createAsyncThunk("users/userSignup", async (user: User | WPUserType, { rejectWithValue }) => {
  const newUser = await axios.post("/wp/v2/users", user);
  if (newUser?.data) {
    const newUserData = newUser.data;
    return { user: newUserData, userLoading: false };
  }
  return rejectWithValue({ error: "User sign up failed", userLoading: false });
});

export const userSignin = createAsyncThunk("users/userSignin", async (user: User | WPUserType, { rejectWithValue }) => {
  const userResponse = await axios.post("/simple-jwt-authentication/v1/token", user);
  if (userResponse?.data) {
    const userDets = {
      username: userResponse.data.user_nicename,
      email: userResponse.data.user_email,
      displayname: userResponse.data.user_display_name,
    };
    // Set token and email in local storage in case Redux data is lost
    localStorage.setItem("token", userResponse.data.token);
    localStorage.setItem("email", userResponse.data.user_email);
    return { user: userDets, token: userResponse.data.token, userLoading: false };
  }
  return rejectWithValue({ error: "User sign in failed", userLoading: false });
});

export const userSignout = createAsyncThunk("users/userSignout", async (token: string, { rejectWithValue }) => {
  const userResponse = await axios.post(
    "/simple-jwt-authentication/v1/token/revoke",
    {},
    { headers: { Authorization: `Bearer ${token}` } },
  );

  if (userResponse) {
    // Clear local storage
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    return { status: true };
  }
  return rejectWithValue({ status: true, error: "Error signing user out" });
});

export const validateToken = createAsyncThunk("users/validateToken", async (url: string, { rejectWithValue }) => {
  let tokenVal: string | null = null;
  let emailVal: string | null = null;
  if (localStorage.getItem("token")) {
    tokenVal = localStorage.getItem("token");
    emailVal = localStorage.getItem("email");
  }
  if (tokenVal && emailVal) {
    const tokenResponse = await axios.post(
      "/simple-jwt-authentication/v1/token/validate",
      {},
      { headers: { Authorization: `Bearer ${tokenVal}` } },
    );
    if (tokenResponse.data.data.status === 200) {
      return { token: tokenVal || "", email: emailVal || "", redirectTo: url };
    }
  }
  return rejectWithValue({ error: "Token validation failed" });
});
