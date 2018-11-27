import React from "react";
import { Col, Form, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input, Button } from "reactstrap";

const signUp = (props) => {
  return (
    <Col xs="12" md={{size:6, offset: 3}}>
      <h1 style={{textAlign: "center"}}>Sign up here!</h1>
      <Form>
      <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText>Email</InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="email" id="email" 
                placeholder="Enter your email" 
                onChange={(event) => props.inputChanged(event, 'email', 'signin')}/>
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText>Password</InputGroupText>
          </InputGroupAddon>
          <Input type="password" name="password" id="password" 
                placeholder="Enter your password"
                onChange={(event) => props.inputChanged(event, 'password', 'signin')} />
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText>First name</InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="firstname" id="firstname" 
                 placeholder="Enter your first name" 
                 onChange={(event) => props.inputChanged(event, 'first_name', 'signin')}/>
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText>Last name</InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="lastname" id="lastname" 
                placeholder="Enter your last name" 
                onChange={(event) => props.inputChanged(event, 'last_name', 'signin')}/>
        </InputGroup>
       
        <FormGroup style={{textAlign: "center"}}>
          <Button onClick={() => props.onFormSubmit()} color="warning">Submit</Button>
        </FormGroup>
      </Form>
    </Col>
  );
};

export default signUp;