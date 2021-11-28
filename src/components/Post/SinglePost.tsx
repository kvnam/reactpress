import React, { ReactElement, useEffect, useState } from "react";
import { Container, Row, Col, Badge } from "reactstrap";
import reactHtmlParser from "react-html-parser";
import { useLocation } from "react-router-dom";

import { RootState } from "@/index";
import { useRPSelector, useRPDispatch } from "@store/store";
import * as actionMethods from "@store/actions/index.actions";
import type { RPPost } from "@rptypes/posts.types";

const SinglePost = () => {
  const postsState = useRPSelector((state: RootState) => state.posts);
  const location = useLocation();
  const dispatch = useRPDispatch();
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
    if (!postsState?.post) {
      return;
    }
    setPost(postsState.post);
  }, [postsState]);

  useEffect(() => {
    if (!post) {
      return;
    }
    let contentVal = null;
    let catTags = null;
    catTags = (post.categoryTags || []).map((cats) => {
      return (
        <h3 key={cats?.id} className="cat-tags">
          <Badge color="primary">{cats?.name || ""}</Badge>
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
