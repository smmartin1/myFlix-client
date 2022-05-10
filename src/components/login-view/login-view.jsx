import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    props.onRegister(true);
  };

  return (
    <Container>
      <Row>
        <Col>
          <CardGroup>
            <Card>
              <Card.Body className="login-card">
                <Card.Title>Login</Card.Title>
                <Form>
                  <Form.Group controlId="formUsername">
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type="text"
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username."
                     />
                  </Form.Group>

                  <Form.Group controlId="formPasswrod">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password."
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit" id="login-btn" onClick={handleSubmit}>Submit</Button>
                  <Button variant="primary" type="submit" id="register-btn" onClick={handleRegister}>New User?</Button>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}

LoginView.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
};
