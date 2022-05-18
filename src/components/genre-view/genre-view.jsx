import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
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
      <Container>
        <Row>
          <Col xs={12} sm={8}>
            <Card className="genre-view">
              <Card.Title className="movie-genre">{movie.Genre.Name}</Card.Title>
              <Card.Text className="genre-description">Description: {movie.Genre.Description}</Card.Text>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={8}>
            {moviesFilter.map((m) => (
              <Card className="genre-card">
                <Card.Title>Movies</Card.Title>
                <Card.Img className="movie-poster" variant="top" src={m.ImagePath} />
                <Card.Body className="movie-body">
                  <Card.Title className="movie-title">{m.Title}</Card.Title>
                  <Link to={'/movies/${movie._id}'}>
                    <Button id="movie-btn" onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
                  </Link>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>

        <Button id="genre-button" onClick={() => { onBackClick(null); }}>Back</Button>
       </Container>
    );
  }
}

GenreView.propTypes = {
  movie: PropTypes.shape({
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    })
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
