import axios from '../../axios-wp';
import * as actionTypes from './actions';

export const userSignup = (user) => {
  return dispatch => {
    axios.post('/wp/v2/json/users')
    .then(newUser => {
      dispatch({type: 'USER_SIGNUP_SUCCESS', user: newUser});
    }).catch(error => {
      dispatch({type: 'USER_SIGNUP_FAIL', error});
    })
  }
};

export const userSignin = (user) => {
  console.log(`Username ${user.username} password ${user.pwd}`);
  return dispatch => {
    axios.post('/simple-jwt-authentication/v1/token', user)
      .then(response => {
        console.log(response.data);
        let userDets = {
          username: response.data.user_nicename,
          email: response.data.user_email,
          displayname:  response.data.user_display_name
        };
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('email', response.data.user_email);
        dispatch({type: 'USER_SIGNIN_SUCCESS', userDets: userDets, token: response.data.token});
      }).catch(err => {
        console.log(err);
        dispatch({type: 'USER_SIGNIN_FAIL', error: err});
      });
  }
};


export const validateToken = (url) => {
  console.log('Validating token');
    return dispatch => {
      let token = null, email = null;
      if(localStorage.getItem('token')){
        token = localStorage.getItem('token');
        email = localStorage.getItem('email')
      }
      if(token){
        axios.post('/simple-jwt-authentication/v1/token/validate', {},{headers: {'Authorization': 'Bearer' + token}}).then(res => {
          console.log(res.data.data);
          if(res.data.data.status === 200){
            dispatch({type: actionTypes.VALIDATE_TOKEN_SUCCESS, token:token, email:email, redirectTo: url});
          }
        }).catch(err => {
          console.log('Error validating token');
          console.log(err);
        });
      }else{
        console.log('No token found');
      }
    };
};