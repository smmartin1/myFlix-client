import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Col, Row } from 'react-bootstrap';

import './login-view.scss';

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ usernameErr, setUsernameErr ] = useState('');
  const [ passwordErr, setPasswordErr ] = useState('');

  const validate = () => {
    let isReq = true;
    if(!username){
     setUsernameErr('Username Required');
     isReq = false;
    }else if(username.length < 2){
     setUsernameErr('Username must be 2 characters long');
     isReq = false;
    }
    if(!password){
     setPasswordErr('Password Required');
     isReq = false;
    }else if(password.length < 6){
     setPassword('Password must be 6 characters long');
     isReq = false;
    }
    return isReq;
}

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://fathomless-peak-84165.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('user does not exist')
    });
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
                      value={username}
                      onChange={e => setUsername(e.target.value)}
                      placeholder="Enter your username."
                     />
                     {console.log('Error')}
                     {usernameErr && <p>{usernameErr}</p>}
                  </Form.Group>

                  <Form.Group controlId="formPasswrod">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password."
                    />
                    {/* code added here to display validation error */}
                    {passwordErr && <p>{passwordErr}</p>}
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
