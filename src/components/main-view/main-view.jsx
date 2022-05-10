import React from 'react';
import axios from 'axios';
import { Container, Row, Col, Navbar } from 'react-bootstrap';

import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import './main-view.scss';

export class MainView extends React.Component{
  constructor(){
      super();
      this.state = {
        movies: [],
        selectedMovie: null,
        user: null,
        register: null
      };
    }

    componentDidMount(){
      axios.get('https://fathomless-peak-84165.herokuapp.com/movies')
        .then(response => {
          this.setState({
            movies: response.data
          });
        })
        .catch(error => {
          console.log(error);
        });
    }

    setSelectedMovie(movie) {
      this.setState({
        selectedMovie: movie
      });
    }

    onLoggedIn(user) {
      this.setState({
        user
      });
    }

    onRegister(register) {
      this.setState({
        register
      });
    }

    render() {
      const { movies, selectedMovie, user, register } = this.state;

      if (register) return <RegistrationView onRegister={(bool) => this.onRegister(bool)} />;

      if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;

      if (movies.length === 0) return <div className="main-view" />;

      return (
        <Container>
          <Row className="navigation-bar">
            <Col>
            <Navbar>
              <h1 className="app-name">MyFlix</h1>
            </Navbar>
            </Col>
          </Row>
          <Row className="main-view justify-content-md-center">
              {selectedMovie
                ? (
                  <Col md={8}>
                    <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                  </Col>
                )
                : (
                  movies.map(movie => (
                      <Col md={3}>
                        <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                      </Col>
                  ))
                )
              }
            </Row>
          </Container>
      );
    }
}

export default MainView;
