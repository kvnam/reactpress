import React from 'react';
import { Nav, NavItem, NavLink } from 'reactstrap';

const sidebar = (props) => {

  return(
      <Nav>
        <NavItem>
          <NavLink href="/dashboard">Dashboard</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/dashboard/create">Create Post</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="/auth/signout">Log Out</NavLink>
        </NavItem>
      </Nav>
  );
};

export default sidebar;