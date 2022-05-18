import React from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
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

      <Container className="director-view">
        <Row>
          <Col xs={12} sm={8}>
            <Card className="director-card">
              <Card.Img src="#" />
              <Card.Body>
                <Card.Title className="movie-director">{movie.Director.Name}</Card.Title>
                <Card.Text className="director-bio">Bio: {movie.Director.Bio}</Card.Text>
                <Card.Text className="director-birth">Birthday: {movie.Director.Birth}</Card.Text>
                //if (movie.Director.Death !== 'null') return <Card.Text className="director-death">Death: {movie.Director.Death}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={8}>
            <h2>Movies</h2>
            {moviesFilter.map((m) => (
            <Card className="director-card">
                <Card.Img className="movie-poster" variant="top" src={m.ImagePath} />
                <Card.Body className="movie-body">
                  <Card.Text className="movie-title">{m.Title}</Card.Text>
                  <Link to={'/movies/${movie._id}'}>
                    <Button id="movie-btn" onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
                  </Link>
                </Card.Body>
            </Card>
            ))}
          </Col>
        </Row>

        <Button id="director-button" onClick={() => { onBackClick(null); }}>Back</Button>
       </Container>
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
