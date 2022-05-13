import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './genre-view.scss';

export class GenreView extends React.Component {
  keypressCallback(event){
    console.log(event.key);
  }

  componentDidMount(){
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypresssCallback);
  }

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="movie-genre">
          <span className="label">{movie.Genre.Name}</span>
        </div>
        <div className="genre-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>

        <Card className="genre-card">
          <Card.Title>Movies</Card.Title>
          {moviesFilter.map((m) => (
                <Card.Img className="movie-poster" variant="top" src={m.ImagePath} />
                <Card.Body className="movie-body">
                  <Card.Title className="movie-title">{m.Title}</Card.Title>
                  <Link to={'/movies/${movie._id}'}>
                    <Button id="movie-btn" onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
                  </Link>
                </Card.Body>
          ))}
        </Card>

        <Button id="genre-button" onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
