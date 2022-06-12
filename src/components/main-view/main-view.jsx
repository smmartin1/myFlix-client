import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

import MoviesList from '../movies-list/movies-list';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import { NavbarView } from '../navbar-view/navbar-view';

import './main-view.scss';

class MainView extends React.Component{
  constructor(){
      super();
    }

    componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
          const { setUser } = this.props;
          setUser(localStorage.getItem('user'));
          this.getMovies(accessToken);
        }
    }

    onLoggedIn(authData) {
      const { setUser } = this.props;
      setUser(authData.users.Username);
      console.log(authData);
      localStorage.setItem('token', authData.token);
      localStorage.setItem('user', authData.users.Username);
      this.getMovies(authData.token);
    }

    getMovies(token) {
      axios.get('https://fathomless-peak-84165.herokuapp.com/movies', {
        headers: { Authorization: 'Bearer ' + token}
      })
      .then(response => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
          console.log(error);
      });
    }

    render() {
      let { movies, user } = this.props;

      return (
        <Container>
          <Router>
            <NavbarView user={user} />

            <Row className="main-view justify-content-md-center">
                <Route exact path="/" render={() => {
                  if (!user) return <Col>
                      <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                    </Col>

                  if (movies.length === 0) return <div className="main-view" />

                  return <MoviesList movies={movies} />;
                }} />

                <Route path="/register" render={() => {
                  if (user) return <Redirect to="/" />
                  return <Col>
                    <RegistrationView />
                  </Col>
                }} />

                <Route path="/movies/:movieId" render={({ match, history }) => {
                  return <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                }} />

                <Route exact path="/genres/:Name" render={({ match, history }) => {
                    if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                      <GenreView
                        genre={movies.find((m) => m.Genre.Name === match.params.Name).Genre}
                        movie={movies.find((m) => m.Genre.Name === match.params.Name)}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                }} />

                <Route exact path="/directors/:Name" render={({ match, history }) => {
                    if (movies.length === 0) return <div className="main-view" />;
                    return <Col md={8}>
                      <DirectorView
                        director={movies.find(m => m.Director.Name === match.params.Name).Director}
                        movie={movies.find(m => m.Director.Name === match.params.Name)}
                        onBackClick={() => history.goBack()}
                      />
                    </Col>
                }} />

                <Route path={`/users/${user}`} render={({ history }) => {
                  if (!user) return <Redirect to="/" />
                  return <Col>
                    <ProfileView
                      user={user}
                      movie={movies}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                }} />
            </Row>
          </Router>
        </Container>
      );
    }
}

let mapStateToProps = state => {
  return {
    movies: state.movies,
    user: state.user
   }
}

export default connect(mapStateToProps, { setMovies, setUser }) (MainView);
