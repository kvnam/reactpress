import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actionTypes from "../../store/actions/index.actions";

class Signout extends Component{
  componentDidMount(){
    if(this.props.token){
      //Dispatch User Signout action
      this.props.logoutUser(this.props.token);
    }
  }

  render(){
    let authRedirect = null;
    if(!this.props.token || this.props.token === ""){
      authRedirect = <Redirect to="/" />;
    }
    return(
      <div>
      {authRedirect}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.usersRed.token
  };
};

const mapDispatchStateToProps = (dispatch) => {
  return {
    logoutUser: (token) => {dispatch(actionTypes.userSignout(token))}
  };
};

export default connect(mapStateToProps, mapDispatchStateToProps)(Signout);