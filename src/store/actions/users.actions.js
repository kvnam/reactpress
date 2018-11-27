import axios from "../../axios-wp";
import * as actionTypes from "./actions";

export const userSignup = (user) => {
  return dispatch => {
    axios.post("/wp/v2/users", user)
    .then(newUser => {
      dispatch({type: "USER_SIGNUP_SUCCESS", user: newUser});
    }).catch(error => {
      dispatch({type: "USER_SIGNUP_FAIL", error});
    })
  }
};

export const userSignin = (user) => {
  return dispatch => {
    axios.post("/simple-jwt-authentication/v1/token", user)
      .then(response => {
        let userDets = {
          username: response.data.user_nicename,
          email: response.data.user_email,
          displayname:  response.data.user_display_name
        };
        //Set token and email in local storage in case Redux data is lost
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", response.data.user_email);
        dispatch({type: "USER_SIGNIN_SUCCESS", userDets: userDets, token: response.data.token});
      }).catch(err => {
        dispatch({type: "USER_SIGNIN_FAIL", error: err});
      });
  }
};

export const userSignout = (token) => {
  return dispatch => {
    axios.post("/simple-jwt-authentication/v1/token/revoke", {}, {headers: {"Authorization": "Bearer " + token}}).then(response => {
      //Clear local storage
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      dispatch({type: actionTypes.USER_SIGNOUT_SUCCESS});
    }).catch(err => {
      dispatch({type: actionTypes.USER_SIGNOUT_FAIL, error: err});
    })
  }
}


export const validateToken = (url) => {
    return dispatch => {
      let token = null, email = null;
      if(localStorage.getItem("token")){
        token = localStorage.getItem("token");
        email = localStorage.getItem("email");
      }
      if(token){
        axios.post("/simple-jwt-authentication/v1/token/validate", {},{headers: {"Authorization": "Bearer " + token}}).then(res => {
          if(res.data.data.status === 200){
            dispatch({type: actionTypes.VALIDATE_TOKEN_SUCCESS, token:token, email:email, redirectTo: url});
          }
        }).catch(err => {
          //TODO: HANDLE VALIDATION ERROR
        });
      }else{
        //TODO: HANDLE NO TOKEN
      }
    };
};