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
    const { genre, movie, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>
            <Card id="genre-view">
              <Card.Title className="movie-genre">{genre.Name}</Card.Title>
              <Card.Text className="genre-description">{genre.Description}</Card.Text>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h3>Movies</h3>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={8}>
            <Card className="genre-card">
              <Card.Img className="movie-poster" variant="top" src={movie.ImagePath} />
              <Card.Body className="movie-body">
                <Card.Title className="movie-title">{movie.Title}</Card.Title>
                <Link to={`/movies/${movie._id}`}>
                  <Button id="movie-btn" variant="primary">Open</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Button id="genre-button" onClick={() => { onBackClick(null); }}>Back</Button>
       </Container>
    );
  }
}

GenreView.propTypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
