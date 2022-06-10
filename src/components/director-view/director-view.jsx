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
    const { director, movie, onBackClick } = this.props;

    return (
      <Container className="director-view">
        <Row>
          <Col>
            <Card id="director-card">
              <Card.Body>
                <Card.Title className="movie-director">{director.Name}</Card.Title>
                <Card.Text className="director-bio">Bio: {director.Bio}</Card.Text>
                <Card.Text className="director-birth">Birthday: {director.Birth}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h2>Movies</h2>
          </Col>
        </Row>

        <Row>
          <Col xs={12} sm={8}>
              <Card className="director-movies">
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

        <Button id="director-button" onClick={() => { onBackClick(null); }}>Back</Button>
       </Container>
    );
  }
}

DirectorView.propTypes = {
  director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired,
      Death: PropTypes.string
  }).isRequired,
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};
