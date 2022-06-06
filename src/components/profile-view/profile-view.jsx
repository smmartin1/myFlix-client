import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoriteMovies } from './favorite-movies';

import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.get(`https://fathomless-peak-84165.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      setUser(response.data)
      setFavoriteMovies(response.data.FavoriteMovies)
      console.log(response.data)
    })
    .catch(function (error) {
        console.log(error);
      });
  }

  const handleUpdate = (e) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.put(`https://fathomless-peak-84165.herokuapp.com/users/${user}`, {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    },
    {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      localStorage.setItem('user', response.data.Username),
      alert('Profile has been updated');
    })
    .catch(function (error) {
        console.log(error);
      });
  }

  const removeUser = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`https://fathomless-peak-84165.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      alert('User has been deleted from the app');
      console.log(response.data);
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.open('/', '_self');
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body id="info-card">
              <Card.Title>Your Info</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
              <Button type="secondary" id="delete-button" onClick={() => removeUser(user.Username)}>Delete Your Account</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body id="update-card">
              <Card.Title>Update Info</Card.Title>
              <Form className='profile-form'>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    name="Username"
                    defaultValue={user.Username}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Username"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="Password"
                    defaultValue={user.Password}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Password"
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    defaultValue={user.Email}
                    onChange={(e) => setUser(e.target.value)}
                    placeholder="Email"
                  />
                </Form.Group>

                <Button type="submit" id="update-button" onClick={handleUpdate}>Update</Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>

      <Row>
        <FavoriteMovies
          movies={ props.movie }
          favoriteMovies={ favoriteMovies }
        />
      </Row>
    </Container>
  )
}
