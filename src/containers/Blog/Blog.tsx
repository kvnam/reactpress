import React, { useState, SyntheticEvent, useEffect, ReactNode } from "react";
import { Container, Row, Col, InputGroup, InputGroupAddon, Button, Alert } from "reactstrap";
import { Spin } from "antd";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import { WPPost } from "../../types/wptypes";
import * as actionMethods from "../../store/actions/index.actions";
import Post from "../../components/Post/Post";

type BlogProps = {
  loadAllPosts: Function;
  searchAllPosts: Function;
  posts: [WPPost];
  postsLoading: boolean;
  error: Error | any;
};

interface DispatchProps {
  loadAllPosts: (perpage: number) => void;
  searchAllPosts: (term: string) => void;
}

type PostsList = JSX.Element[] | [];

const Blog: React.FC<BlogProps> = (props: BlogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [onAlert, setOnAlert] = useState(false);
  const [internalError, setInternalError] = useState("");
  const [postsList, setPostsList] = useState<PostsList | null>(null);

  const history = useHistory();

  const { postsLoading, posts, loadAllPosts, searchAllPosts, error } = props;

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
      searchAllPosts(searchTerm);
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
    loadAllPosts(5);
  }, []);

  useEffect(() => {
    if (!postsLoading && posts?.length) {
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
    }
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

const mapStateToProps = (state: any) => {
  return {
    posts: state.postsRed.posts,
    error: state.postsRed.error,
    postsLoading: state.postsRed.postsLoading,
  };
};

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    loadAllPosts: (perpage: number) => {
      dispatch(actionMethods.loadAllPosts(perpage));
    },
    searchAllPosts: (term: string) => {
      dispatch(actionMethods.searchAllPosts(term));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Blog);
