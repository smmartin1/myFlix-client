import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './registration-view.scss'

export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [values, setValues] = useState({
    nameErr: '',
    usernameErr: '',
    passwordErr: '',
    emailErr: ''
  });

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
     setPasswordErr('Password must be 6 characters long');
     isReq = false;
    }
    if(!email) {
      setEmailErr('Email is Required');
      isReq = false;
    }else if(email.indexOf('@') === -1) {
      setEmailErr('Must have a valid email');
      isReq = false;
    }
    return isReq;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if(isReq) {
      axios.post('https://fathomless-peak-84165.herokuapp.com/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
      .then(response => {
        const data = response.data;
        console.log(data);
        alert('Welcome to myFlix!');
        window.open('/', '_self');
      })
      .catch(e => {
        console.log('error registering the user')
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Body className="registration-card">
              <Card.Title>Welcome!</Card.Title>
              <Form onSubmit={(e) => handleRegister(e)}>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Password:</Form.Label>
                  <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
                </Form.Group>
                <Button type="submit" id="submit-btn" onClick={handleRegister}>Submit</Button>

                <Link to={"/"}>
                  <Button type="submit" id="back-btn">Back</Button>
                </Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
