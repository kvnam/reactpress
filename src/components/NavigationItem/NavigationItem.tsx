import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

type NavItemProps = {
  link : string,
  linkName: string
}

const navigationItem = (props: NavItemProps) => {
  return (
      <NavItem className="nav-item">
        <NavLink to={props.link}>{props.linkName}</NavLink>
      </NavItem>
  );
};

export default navigationItem;
