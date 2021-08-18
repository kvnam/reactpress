import React, { useState, SyntheticEvent, useEffect } from "react";
import { Container, Row, Col, InputGroup, InputGroupAddon, Button, Alert } from "reactstrap";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";

import { RootState } from "@/index";
import { useRPSelector, useRPDispatch } from "store/store";
import { WPPost } from "@rptypes/wptypes";
import * as actionMethods from "@store/actions/index.actions";
import Post from "@components/Post/Post";

type PostsList = JSX.Element[] | [];

const Blog = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onAlert, setOnAlert] = useState(false);
  const [internalError, setInternalError] = useState("");
  const [postsList, setPostsList] = useState<PostsList>([]);

  const history = useHistory();

  const postsState = useRPSelector((state: RootState) => state.posts);

  const dispatch = useRPDispatch();

  const { postsLoading, posts = [], error } = postsState;

  const resetError = () => {
    setInternalError("");
  };

  const toggleAlertShow = () => {
    if (internalError && onAlert) {
      resetError();
    }
    setOnAlert(!onAlert);
  };

  const readMoreHandler = (id: number) => {
    // Send selected post to Post component
    history.push(`/post?id=${id}`);
  };

  const onSearchHandler = () => {
    if (searchTerm !== "") {
      dispatch(actionMethods.searchAllPosts(searchTerm));
    } else {
      setInternalError("Search Term cannot be empty!");
      setOnAlert(true);
    }
  };

  const searchInputChanged = (event: SyntheticEvent) => {
    const element = event.target as HTMLInputElement;
    setSearchTerm(element.value);
  };

  useEffect(() => {
    dispatch(actionMethods.loadAllPosts(5));
  }, []);

  useEffect(() => {
    if (postsLoading || !posts?.length || postsList.length) {
      return;
    }
    const updatedPosts = posts.map((post: WPPost) => {
      return (
        <Post
          key={post.id}
          title={post.title.rendered}
          excerpt={post.excerpt.rendered}
          medialink={post.media_link}
          postId={post.id}
          onReadMore={readMoreHandler}
        />
      );
    });
    setPostsList(updatedPosts);
  }, [posts, postsLoading]);

  return (
    <Container>
      {error ? (
        <Alert color="danger" isOpen={onAlert} toggle={toggleAlertShow}>
          {error}
        </Alert>
      ) : null}
      {internalError ? (
        <Alert color="danger" isOpen={onAlert} toggle={toggleAlertShow}>
          {internalError}
        </Alert>
      ) : null}
      <Row>
        <Col xs="12" md="4">
          <h1>All Posts</h1>
        </Col>
        <Col xs="12" md="8">
          <InputGroup style={{ float: "right", width: "auto" }}>
            <input type="text" onChange={searchInputChanged} />
            <InputGroupAddon addonType="append">
              <Button onClick={onSearchHandler}>Search</Button>
            </InputGroupAddon>
          </InputGroup>
        </Col>
      </Row>
      {postsLoading ? <Spin size="large" /> : null}
      {!postsLoading && postsList?.length ? postsList : null}
    </Container>
  );
};

export default Blog;
