import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actionMethods from "../../store/actions/index.actions";
import SignUp from "../../components/Auth/SignUp";
import SignIn from "../../components/Auth/SignIn";
import SignOut from "../../components/Auth/Signout";

class Auth extends Component{

  state = {
    user : {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      username: "",
      locale: "en_US",
      description: "",
      name: ""
    },
    isNewUser : false,
    alertText : null
  };

  componentDidMount(){
    let params = new URLSearchParams(this.props.location.search);
    if(params.get("user")){
      this.setState({isNewUser: true});
    }
  }
  /*  Validate inputs for the User fields for Signin and Sign Up forms
   *  1. Check for empty input                      ~
   *  2. Check for password strength (OWASP regex)  X
   *  3. Check email validity                       X
   *  4. Check for blacklisted words                x
   *  5. Trigger error texts                        x
   */
  validateInputs(forForm){
    //Empty or false inputs
    if(this.state.user.username === "" || !this.state.user.username){
      return false;
    }else if(this.state.user.password === "" || !this.state.user.password){
      return false;
    }
    if(forForm === 'signup'){
      if(this.state.user.email === "" || !this.state.user.email){
        return false;
      }else if(this.state.user.first_name === "" || this.state.user.last_name === ""){
        return false;
      }
    }
    return true;
  }

  onUserSignUp = () => {
    let tempUser = {
      ...this.state.user
    };
    tempUser.username = tempUser.email;
    tempUser.name = tempUser.first_name + ' ' + tempUser.last_name;
    this.setState({user: tempUser}, () => {
      //TODO: Validate inputs
      let isValid = this.validateInputs('signup');
      if(isValid){
        //Assign email to username
        this.props.onUserSignUpSubmit(this.state.user);  
      }
    });
  }

  onUserSignin = () => {
    //TODO: Validate inputs
    if(this.state.user.username === "" || this.state.user.password === ""){
      //TODO: ADD ERROR DIALOG
    }else{
      //Submit the form
      let userDets = {
        username: this.state.user.username,
        password: this.state.user.password
      };
      this.props.onUserSigninSubmit(userDets);
    }
  }

  onInputClicked = (event, forField, forForm)  => {
    let tempUser = this.state.user;
    tempUser[forField] = event.target.value;
    this.setState({user: tempUser});
  }

  render(){
    return (
        <React.Fragment>
          {this.props.token ? <Redirect to="/dashboard" /> : null}
          <Switch>
          <Route path="/auth/signin" render={() => <SignIn uid={this.state.user.username} pwd={this.state.user.password} onUserClick={this.onUserSignin} inputChanged={this.onInputClicked} />} />
          <Route path="/auth/signup" render={() => <SignUp user={this.state.user} inputChanged={this.onInputClicked} onFormSubmit={this.onUserSignUp}/>} />
          <Route path="/auth/signout" render={() => <SignOut />} />
          </Switch>
        </React.Fragment>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.usersRed.userInfo,
    token: state.usersRed.token
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onUserSigninSubmit: (user) => {dispatch(actionMethods.userSignin(user))},
    onUserSignUpSubmit: (user) => {dispatch(actionMethods.userSignup(user))},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);