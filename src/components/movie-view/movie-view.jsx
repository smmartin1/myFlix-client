import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';

import { Link } from 'react-router-dom';

import './movie-view.scss';

export class MovieView extends React.Component {
  constructor() {
    super();
    this.state = {
      FavoriteMovies: []
    };
  }

  keypressCallback(event){
    console.log(event.key);
  }

  componentDidMount(){
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypresssCallback);
  }

  addFav = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const favMovie = this.state.FavoriteMovies;
    let isFav = favMovie.includes(this.props.movie._id);

    if (!isFav) {
      axios.post(`https://fathomless-peak-84165.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {}, {
        headers: { Authorization: 'Bearer ' + token}
      })
      .then((response) => {
        alert('Movie has been added to favorites');
        console.log(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }

  removeFav = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const favMovie = this.state.FavoriteMovies;
    let isFav = favMovie.includes(this.props.movie._id);

    if (isFav) {
      axios.delete(`https://fathomless-peak-84165.herokuapp.com/users/${user}/movies/${this.props.movie._id}`, {
        headers: { Authorization: `Bearer ${token}`}
      })
      .then((response) => {
        alert('Movie has been removed from favorites');
        console.log(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }
  }

  render() {
    const { movie, onBackClick } = this.props;
    const { FavoriteMovies } = this.state;
    const favMovie = this.state.FavoriteMovies;
    let isFav = favMovie.includes(this.props.movie._id);

    return (
      <Container className="movie-view">
        <Row>
          <Col>
            <Card id="movie-card">
              <Card.Img className="movie-poster" src={movie.ImagePath} />
              <Card.Body>
                <Card.Title className="movie-title">{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Card.Text>
                  Genre: <Link id="genre-link" to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
                </Card.Text>
                <Card.Text>
                  Director: <Link id="director-link" to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
                </Card.Text>

                {!isFav && (
                  <Button id="add-button" onClick={this.addFav}>Add to Favorites</Button>
                )}
                {isFav && (
                  <Button id="remove-button" onClick={this.removeFav}>Remove from Favorites</Button>
                )}
              </Card.Body>

              <Button id="movie-button" onClick={() => { onBackClick(null); }}>Back</Button>
            </Card>
          </Col>
        </Row>
       </Container>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Birth: PropTypes.string.isRequired
    })
  }),
  onBackClick: PropTypes.func.isRequired
};
