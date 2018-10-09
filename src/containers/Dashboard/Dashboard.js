import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';


class Dashboard extends Component{
  render(){
    return (
      <Container>
        <h1>User Dashboard</h1>
      </Container>
    )
  }
};

export default Dashboard;