import React, { Component } from "react";
import { Container, Row, Col, InputGroup, InputGroupAddon, Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Alert } from "reactstrap";

import * as actionMethods from "../../store/actions/index.actions";
import Post from "../../components/Post/Post";

class Blog extends Component{
  state = {
    searchTerm: "",
    onAlert: false,
    internalError: null
  };

  componentDidMount(){
    this.props.loadAllPosts(5);
  }

  onAlertShow = () => {
    this.setState({onAlert: true});
  }

  onAlertDismiss = () => {
    this.setState({onAlert: false, internalError: null});
  }

  readMoreHandler = (id) => {
    //Send selected post to Post component 
    this.props.history.push("/post?id=" + id);
  }

  onSearchHandler = () => {
    if(this.state.searchTerm !== ""){
      this.props.searchAllPosts(this.state.searchTerm);
    }else{
      this.setState((state) => {
        return {internalError: "Search Term cannot be empty!", onAlert: true};
      });
    }
  }

  searchInputChanged = (event) => {
    this.setState({searchTerm : event.target.value});
  };

  render(){
    let postsList = <h1>No Posts Yet!</h1>;
    if(this.props.posts !== null){
      postsList = this.props.posts.map(post => {
        return <Post 
                key={post.id} 
                title={post.title.rendered} 
                excerpt={post.excerpt.rendered} 
                medialink={post.media_link} 
                postId={post.id}
                onReadMore={this.readMoreHandler}/>;
      });
    }
    
    return(
      <Container>
        {this.props.error ? (<Alert color="danger" isOpen={this.state.onAlert} toggle={this.onAlertDismiss}>
          {this.props.error}
        </Alert>) : null }
        {this.state.internalError ? (<Alert color="danger" isOpen={this.state.onAlert} toggle={this.onAlertDismiss}>
          {this.state.internalError}
        </Alert>) : null }
        <Row>
          <Col xs="12" md="4"><h1>All Posts</h1></Col>
          <Col xs="12" md="8">
          <InputGroup style={{float: "right", width: "auto"}}>
          <input type="text" onChange={this.searchInputChanged} />
            <InputGroupAddon addonType="append">
            <Button onClick={this.onSearchHandler}>Search</Button>
            </InputGroupAddon>
          </InputGroup>
          </Col>
        </Row>
        {postsList}
      </Container>
    );
  }
};

const mapStateToProps = (state) => {
  return{
    posts: state.postsRed.posts,
    error: state.postsRed.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadAllPosts: (perpage) => {dispatch(actionMethods.loadAllPosts(perpage))},
    searchAllPosts: (term) => {dispatch(actionMethods.searchAllPosts(term))}
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Blog));