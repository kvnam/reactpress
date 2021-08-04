import React from "react";
import { Navbar, NavbarBrand, Nav } from "reactstrap";

import NavigationItem from "../../components/NavigationItem/NavigationItem";
import useNavMenu from "../../hooks/useNavMenu/index";

import "../../components/NavigationItem/NavigationItem.css";

// TODO: Add authentication

const Navigation: React.FC  = () => {

  const navMenuList = useNavMenu();

  const navList = navMenuList
    .map((item) => {
      return <NavigationItem key={item.link} link={item.link} linkName={item.linkName} />;
    })
    .filter((v) => !!v);

  return (
    <>
      <Navbar color="dark" dark className="bg-dark mb-5">
        <NavbarBrand href="/">REACTPRESS</NavbarBrand>
        <Nav className="justify-content-end">{navList}</Nav>
      </Navbar>
    </>
  );
};

export default Navigation;
