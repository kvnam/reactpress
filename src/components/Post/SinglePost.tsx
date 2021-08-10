import React, { ReactElement, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Badge } from "reactstrap";
import reactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";

import * as actionMethods from "../../store/actions/index.actions";
import { RPPost } from "../../types/posts.types";

const SinglePost = () => {
  const postsState = useSelector((state: any) => state.postsRed);
  const location = useLocation();
  const dispatch = useDispatch();
  const [post, setPost] = useState<RPPost | null>(null);
  const [content, setContent] = useState<ReactElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pID = params.get("id");
    if (pID) {
      dispatch(actionMethods.loadSinglePost(parseInt(pID, 10)));
    }
  }, []);

  useEffect(() => {
    if (!postsState?.singlePost || postsState.singlePost.id === post?.id) {
      return;
    }
    setPost(postsState.singlePost);
  }, [postsState]);

  useEffect(() => {
    if (!post) {
      return;
    }
    let contentVal = null;
    let catTags = null;
    catTags = post.categoryTags.map((cats) => {
      return (
        <h3 key={cats.id} className="cat-tags">
          <Badge color="primary">{cats.name}</Badge>
        </h3>
      );
    });
    contentVal = (
      <>
        <Col xs="12" md="12">
          {reactHtmlParser(post.title.rendered)}
        </Col>
        <Col xs="12" md="12">
          {catTags}
        </Col>
        <Col xs="12" md="12">
          <img className="post-img" alt={post.title.rendered} src={post.medialink} />
        </Col>
        <Col xs="12" md="12">
          {reactHtmlParser(post.content.rendered)}
        </Col>
      </>
    );
    setContent(contentVal);
  }, [post]);

  if (!post) {
    return <h2>Post loading...</h2>;
  }

  return (
    <Container>
      <Row>{content}</Row>
    </Container>
  );
};

export default SinglePost;
