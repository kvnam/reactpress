import React from 'react';
import { Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';

const signUp = (props) => {
  return (
    <Col xs="12" md={{size:6, offset: 3}}>
      <h1 style={{textAlign: 'center'}}>Sign up here!</h1>
      <Form>
        <FormGroup>
          <Label for="username">Username</Label>
          <Input type="text" name="username" id="username" placeholder="Enter your username" />
        </FormGroup>
        <FormGroup>
          <Label for="password">Password</Label>
          <Input type="password" name="password" id="password" placeholder="Enter your password" />
        </FormGroup>
        <FormGroup>
          <Label for="firstname">First Name</Label>
          <Input type="text" name="firstname" id="firstname" placeholder="Enter your first name" />
        </FormGroup>
        <FormGroup>
          <Label for="lastname">Last Name</Label>
          <Input type="text" name="lastname" id="lastname" placeholder="Enter your last name" />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="text" name="email" id="email" placeholder="Enter your email" />
        </FormGroup>
        <FormGroup style={{textAlign: 'center'}}>
          <Button color="warning">Submit</Button>
        </FormGroup>
      </Form>
    </Col>
  )
};

export default signUp;