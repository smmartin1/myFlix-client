import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './director-view.scss';

export class DirectorView extends React.Component {
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
      <div className="director-view">
        <div className="director-img">
          <img src="#" />
        </div>
        <div className="movie-director">
          <span className="label">{movie.Director.Name}</span>
        </div>
        <div className="director-bio">
          <span className="label">Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>
        <div className="director-birth">
          <span className="label">Birthday: </span>
          <span className="value">{movie.Director.Birth}</span>
        </div>

        if (movie.Director.Death === 'null') return {
          <div className="director-death">
            <span className="label">Death: </span>
            <span className="value">{movie.Director.Death}</span>
          </div>
        }

        <Card className="director-card">
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

        <Button id="director-button" onClick={() => { onBackClick(null); }}>Back</Button>
       </div>
    );
  }
}

DirectorView.propTypes = {
  movie: PropTypes.shape({
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
