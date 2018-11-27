import React from "react";
import { Col, Form, InputGroup, FormGroup, Input, Button, InputGroupAddon, InputGroupText } from "reactstrap";

const signIn = (props) => {
  return (
    <Col xs="12" md={{size:6, offset: 3}}>
      <h1 style={{textAlign: "center"}}>Sign In!</h1>
      <Form autoComplete="false">
        <InputGroup className="mb-3">
          <InputGroupAddon addonType="prepend">
            <InputGroupText>Username</InputGroupText>
          </InputGroupAddon>
          <Input type="text" name="username" id="username" placeholder="Enter your username" value={props.uid} onChange={(event) => props.inputChanged(event, "username", "signin")}/>
        </InputGroup>
        <InputGroup className="mb-3">
        <InputGroupAddon addonType="prepend">
            <InputGroupText>Password</InputGroupText>
          </InputGroupAddon>
          <Input type="password" name="password" id="password" placeholder="Enter your password" value={props.pwd} onChange={(event) => props.inputChanged(event, "password", "signin")}/>
        </InputGroup>
        <FormGroup style={{textAlign: "center"}}>
          <Button color="warning" onClick={props.onUserClick}>Submit</Button>
        </FormGroup>
      </Form>
    </Col>
  )
};

export default signIn;