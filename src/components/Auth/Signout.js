import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class Signout extends Component{
  componentDidMount(){
    if(this.props.token){
      console.log('CALLING LOGOUT USER');
      this.props.logoutUser();
    }
  }

  render(){
    let authRedirect = null;
    if(this.props.token === null){
      //authRedirect = <Redirect to="/" />;
    }
    return(
      <div>
      {authRedirect}
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.usersRed.token
  };
};

const mapDispatchStateToProps = (dispatch) => {
  return {
    logoutUser: () => {dispatch({type: 'USER_SIGNOUT'})}
  }
};

export default connect(mapStateToProps, mapDispatchStateToProps)(Signout);