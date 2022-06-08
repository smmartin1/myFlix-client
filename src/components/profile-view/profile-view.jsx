import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Card, Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FavoriteMovies } from './favorite-movies';
import { UpdateUser } from './update-user';

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
          <UpdateUser user={user} />
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
