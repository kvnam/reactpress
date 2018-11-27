import React from "react";
import { Row, Col, Button } from "reactstrap";
import ReactHtmlParser from "react-html-parser";

import "./Post.css";

const post = (props) => {

  let titleHtml = ReactHtmlParser(props.title);
  let excerptHtml = ReactHtmlParser(props.excerpt);
  //Use the same component to display Single Post
  return (
    <Row>
      <Col xs="12" md="12">{titleHtml}</Col>
      <Col xs="12" md="4">
        <img className="excerpt-img" alt={props.postId} src={props.medialink} />
      </Col>
      <Col xs="12" md="8">{excerptHtml}</Col>
      <Col xs="12" md="12" className="text-right">
        <Button color="primary" onClick={() => props.onReadMore(props.postId)}>Read More</Button>
      </Col>
    </Row>
  );
};

export default post;