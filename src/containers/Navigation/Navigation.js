import React, { Component } from "react";
import { Navbar, NavbarBrand, Nav } from "reactstrap";

import NavigationItem from "../../components/NavigationItem/NavigationItem";

const navItems = [
  {
    link: "/",
    linkName: "BLOG",
    isVisible: true
  },
  {
    link: "/auth",
    linkName: "SIGN IN/SIGN UP",
    isVisible: true
  }
];

class Navigation extends Component{

  render(){
    const navList = navItems.map(item => {
      return <NavigationItem key={item.link} link={item.link} linkName={item.linkName} />
    });
    return(
      <Navbar color="inverse">
        <NavbarBrand href="/">ReactPress</NavbarBrand>
        <Nav className="justify-content-end">
          {navList}
        </Nav>
      </Navbar>
    );
  };
};

export default Navigation;