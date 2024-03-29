import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Card, Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export function UpdateUser({ user }) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const handleUpdate = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    axios.put(`https://fathomless-peak-84165.herokuapp.com/users/${user.Username}`, {
      Username: username,
      Password: password,
      Email: email
    },
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      alert('Profile has been updated');
      localStorage.setItem('user', response.data.Username);
      window.open(`/users/${user.Username}`, '_self');
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  return (
    <Fragment>
      <Card>
        <Card.Body id="update-card">
          <Card.Title id="update-title">Update Info</Card.Title>
          <Form className='profile-form'>
            <Form.Group>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                name="Username"
                defaultValue={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                name="Password"
                defaultValue={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="Email"
                defaultValue={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </Form.Group>

            <Button type="submit" id="update-button" onClick={handleUpdate}>Update</Button>
          </Form>
        </Card.Body>
      </Card>
    </Fragment>
  )
}
