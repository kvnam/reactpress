import React from "react";
import PropTypes from "prop-types";
// TODO: Add classname and other props from WP meta tags
// Set up each page

type WPPageProps = {
  children?: React.ReactNode;
  pageClassName?: string;
};

const WPPage: React.FC = (props: WPPageProps) => {
  const { children, pageClassName } = props;
  return <div className={pageClassName}>{children}</div>;
};

WPPage.defaultProps = {
  children: null,
  pageClassName: "",
};

WPPage.propTypes = {
  children: PropTypes.node,
  pageClassName: PropTypes.string,
};

export default WPPage;
