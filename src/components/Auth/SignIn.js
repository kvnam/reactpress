import React from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const signIn = (props) => {
  return (
    <Col xs="12" md={{size:6, offset: 3}}>
      <h1 style={{textAlign: 'center'}}>Sign In!</h1>
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="Enter your username" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Enter your password" />
        </FormGroup>
        <FormGroup style={{textAlign: 'center'}}>
          <Button color="warning">Submit</Button>
        </FormGroup>
      </Form>
    </Col>
  )
};

export default signIn;