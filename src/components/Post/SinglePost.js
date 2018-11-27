import React, { Component } from "react";
import { connect } from "react-redux";
import { Container, Row, Col, Badge } from "reactstrap";
import reactHtmlParser from "react-html-parser";

import * as actionMethods from "../../store/actions/index.actions";

class singlePost extends Component {

  componentDidMount(){
    //Call Load Post Action Method after retrieving ID from URL
    const params = new URLSearchParams(this.props.location.search);
    const pID = params.get("id");
    this.props.onLoadSinglePost(pID);
  }

  render(){
    let content = <h2>Post loading...</h2>;
    let catTags = null;
    if(this.props.post !== null){
      catTags = this.props.post.categoryTags.map((cats) => {
        return <h3 key={cats.id} className="cat-tags"><Badge color="primary">{cats.name}</Badge></h3>;
      });
      content = (
        <React.Fragment>
          <Col xs="12" md="12">{reactHtmlParser(this.props.post.title.rendered)}</Col>
          <Col xs="12" md="12">{catTags}</Col>
          <Col xs="12" md="12"><img className="post-img" alt={this.props.post.title.rendered} src={this.props.post.medialink} /></Col>
          <Col xs="12" md="12">{reactHtmlParser(this.props.post.content.rendered)}</Col>
        </React.Fragment>
      );
    }
    return (
      <Container>
      <Row>
        {content}
      </Row>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    post: state.postsRed.singlePost,
    error: state.postsRed.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoadSinglePost: (pid) => {dispatch(actionMethods.loadSinglePost(pid))}
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(singlePost);