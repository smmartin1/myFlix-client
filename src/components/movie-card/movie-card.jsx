import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-card.scss';

export class MovieCard extends React.Component {
  render(){
    const { movie, onMovieClick } = this.props;
    return (
      <Card className="movie-card">
        <Card.Img variant="top" src={movie.ImagePath}/>
        <Card.Body className="movie-body">
          <Card.Title className="movie-title">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={'/movies/${movie._id}'}>
            <Button id="movie-btn" onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    })
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
