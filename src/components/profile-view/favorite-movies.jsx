import React, { Fragment, useState } from 'react';
import axios from 'axios';
import { Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './profile-view.scss';

export function FavoriteMovies({ user, movies, favoriteMovies }) {
  const movieList = movies.filter(m => {
    return favoriteMovies.includes(m._id)
  })

  const removeFav = (movieId) => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    axios.delete(`https://fathomless-peak-84165.herokuapp.com/users/${user}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then((response) => {
      alert('Movie has been removed from favorites');
      window.open(`/users/${user}`, '_self');
    })
    .catch(function (error) {
        console.log(error);
    });
  }

  return (
    <Fragment>
      { movieList.length === 0
        ? (<p>Add your favorite movies</p>)
        : movieList.map((movie) => {
            return (
              <Col xs={12} md={6} lg={4}>
                <Card>
                  <Card.Img variant="top" src={movie.ImagePath} />
                  <Card.Body id="fav-card">
                    <Card.Title id="fav-title">
                      <Link to={`/movies/${movie._id}`} id="fav-title">{movie.Title}</Link>
                    </Card.Title>
                    <Button variant="secondary" id="remove-button" onClick={() => {removeFav(movie._id)}}>Remove</Button>
                  </Card.Body>
                </Card>
              </Col>
            )
          })
      }
    </Fragment>
  )
}
