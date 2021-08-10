import React from "react";
import { Row, Col, Button } from "reactstrap";
import ReactHtmlParser from "react-html-parser";

import "./Post.css";

type PostProps = {
  title: string;
  excerpt: string;
  medialink: string;
  postId: number;
  onReadMore: (postId: number) => void;
};

const Post: React.FC<PostProps> = (props: PostProps) => {
  const { title, excerpt, medialink, postId, onReadMore } = props;
  const titleHtml = ReactHtmlParser(title);
  const excerptHtml = ReactHtmlParser(excerpt);

  return (
    <Row>
      <Col xs="12" md="12">
        {titleHtml}
      </Col>
      <Col xs="12" md="4">
        <img className="excerpt-img" alt={postId.toString()} src={medialink} />
      </Col>
      <Col xs="12" md="8">
        {excerptHtml}
      </Col>
      <Col xs="12" md="12" className="text-right">
        <Button color="primary" onClick={() => onReadMore(postId)}>
          Read More
        </Button>
      </Col>
    </Row>
  );
};

export default Post;
