import axios from '../../axios-wp';


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