import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Dashboard extends Component{

  render(){
    let authRedirect = null;
    if(this.props.token === null || this.props.token === ""){
      authRedirect = <Redirect to="/auth/signin" />
    }
    return(
        <Row> 
          {authRedirect}
        <Col xs="12" sm="12">        
          <Switch>
            <Route path="/dashboard/create" render={() => <div className="text-center mt-5">CREATE POST CONTENT</div>}/>
            <Route path="/dashboard" render={() => <div className="text-center mt-5">DASHBOARD CONTENT</div>}/>
          </Switch>        
        </Col>
        </Row>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.usersRed.token
  };
}

export default connect(mapStateToProps)(Dashboard);