import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Form, Button, Card, Container, Row, Col} from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export function ProfileView({ movies, onUpdatedUserInfo }) {
  const [user, setUser] = useState('');
  const favoriteMovieList = movies.filter((movies) => {});
  const getUser = () => {}
  const handleSubmit = (e) => {}
  const removeFav = (id) => {}
  const handleUpdate = (e) => {};

  useEffect(() => {}, [])

  return (
    <Container>
      <Row>
        <Col xs={12} sm={4}>
          <Card>
            <Card.Body>
              <Card.Title>Your Info</Card.Title>
              <Card.Text>Username: {user.Username}</Card.Text>
              <Card.Text>Email: {user.Email}</Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} sm={8}>
          <Card>
            <Card.Body>
              <Card.Title>Update Info</Card.Title>
              <Form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
                <Form.Group>
                  <Form.Label>Username:</Form.Label>
                  <Form.Control type="text" name="Username" defaultValue={user.Username} onChange={e => handleUpdate(e)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" name="Password" defaultValue={user.Password} onChange={e => handleUpdate(e)} />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" name="Email" defaultValue={user.Email} onChange={e => handleUpdate(e)} />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col xs={2}>
          <h2>Favorite Movies</h2>
        </Col>
      </Row>
      <Row>
        {favoriteMovieList.map((movies) => {
          return (
            <Col xs={12} md={6} lg={4} key={movies._id}>
              <img src={movies.ImagePath} />
              <Link to={'/movies/${movies._id}'}>
                <h4>{movies.Title}</h4>
              </Link>
              <Button variant="secondary" onClick={() => removeFav(movies._id)}>Remove from list</Button>
            </Col>
          )
        })}
      </Row>
    </Container>
  )
}
