import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav } from "reactstrap";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import * as actionMethods from "../../store/actions/index.actions";
import NavigationItem from "../../components/NavigationItem/NavigationItem";
import SubMenu from "../../components/NavigationItem/SubMenu/SubMenu";

import "../../components/NavigationItem/NavigationItem.css";

const navItems = [
  {
    link: "/",
    linkName: "BLOG",
    isVisible: "all"
  },
  {
    link: "/auth/signin",
    linkName: "LOG IN",
    isVisible: "noauth"
  },
  {
    link: "/auth/signup",
    linkName: "SIGN UP",
    isVisible: "noauth"
  }
];

class Navigation extends Component{

  componentDidMount(){
    let url = this.props.location.pathname;
    if(!this.props.token && url !== "/auth/signout"){
      this.props.validateToken(url);
    }
  }

  render(){
    const navList = navItems.map(item => {
      if(this.props.token && item.isVisible !== "noauth"){
        return <NavigationItem key={item.link} link={item.link} linkName={item.linkName} />
      }else if(!this.props.token){
        return <NavigationItem key={item.link} link={item.link} linkName={item.linkName} />
      }
    });
    return(
      <React.Fragment>
      <Navbar color="dark" dark className="bg-dark mb-5">
        <NavbarBrand href="/">REACTPRESS</NavbarBrand>
        <Nav className="justify-content-end">
          {navList}
        </Nav>
      </Navbar>
      {this.props.token ? <Navbar color="light" light className="submenu"><SubMenu /></Navbar> : null}
      </React.Fragment>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    token: state.usersRed.token,
    redirectTo: state.usersRed.redirectURL
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    validateToken: (url) => {dispatch(actionMethods.validateToken(url))}
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));