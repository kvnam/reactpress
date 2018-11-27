import React from "react";
import { NavLink } from "react-router-dom";
import { Nav, NavItem } from "reactstrap";

const sidebar = (props) => {

  return(
      <Nav>
        <NavItem>
          <NavLink to="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/dashboard/create">Create Post</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/auth/signout">Log Out</NavLink>
        </NavItem>
      </Nav>
  );
};

export default sidebar;