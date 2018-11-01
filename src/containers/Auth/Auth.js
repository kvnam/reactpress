import React, { Component } from 'react';
import { Row, Alert } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';

import SignUp from '../../components/Auth/SignUp';
import SignIn from '../../components/Auth/SignIn';

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
    let params = new URLSearchParams(this.props.location.search);
    if(params.get('user')){
      this.setState({isNewUser: true});
    }
  }

  render(){
    return (
        <React.Fragment>
          <Route path="/auth/signin" render={() => <SignIn />} />
          <Route path="/auth/signup" render={() => <SignUp user={this.state.user} />} />
        </React.Fragment>
    );
  }

};

export default Auth;