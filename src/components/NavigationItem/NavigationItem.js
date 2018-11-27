import React from "react";
import { NavLink } from "react-router-dom";
import { NavItem } from "reactstrap";

const navigationItem = (props) => {
  return (
    <React.Fragment>
      <NavItem className="nav-item">
        <NavLink to={props.link}>{props.linkName}</NavLink>
      </NavItem>
    </React.Fragment>
  );
};

export default navigationItem;