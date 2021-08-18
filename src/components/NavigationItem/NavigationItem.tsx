import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

type NavItemProps = {
  link: string;
  linkName: string;
};

const navigationItem = (props: NavItemProps) => {
  const { link, linkName } = props;
  return (
    <NavItem className="nav-item">
      <NavLink to={link}>{linkName}</NavLink>
    </NavItem>
  );
};

export default navigationItem;
