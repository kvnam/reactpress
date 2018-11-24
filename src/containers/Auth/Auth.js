import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actionMethods from '../../store/actions/index.actions';
import SignUp from '../../components/Auth/SignUp';
import SignIn from '../../components/Auth/SignIn';
import SignOut from '../../components/Auth/Signout';

class Auth extends Component{

  state = {
    user : {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      username: ''
    },
    isNewUser : false,
    alertText : null
  };

  componentDidMount(){
    console.log('AUTH DID MOUNT');
    let params = new URLSearchParams(this.props.location.search);
    if(params.get('user')){
      this.setState({isNewUser: true});
    }
  }

  onUserSignin = () => {
    //Validate inputs
    if(this.state.user.username === "" || this.state.user.password === ""){
      console.log('Disallow submit');
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
          <Route path="/auth/signup" render={() => <SignUp user={this.state.user} />} />
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
    onUserSigninSubmit: (user) => {dispatch(actionMethods.userSignin(user))}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);