import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component{
  constructor(){
      super();
      this.state = {
        movies: [
          {
            _id: 1,
            Title: 'Lord of The Rings: The Fellowship of The Rings',
            Description: 'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
            Genre: 'Fantasy',
            Director: 'Peter Jackson',
            ImagePath: 'https://i.ytimg.com/vi_webp/l2NZzop5Xbw/movieposter_en.webp'
          },
          {
            _id: 2,
            Title: 'How To Train Your Dragon',
            Description: 'A hapless young Viking who aspires to hunt dragons becomes the unlikely friend of a young dragon himself, and learns there may be more to the creatures than he assumed.',
            Genre: 'Animation',
            Director: 'Chris Sanders',
            ImagePath: 'https://i.ytimg.com/vi/MyZ4ZBUqtSs/movieposter.jpg'
          },
          {
            _id: 3,
            Title: 'Jurassic Park',
            Description: 'A pragmatic paleontologist touring an almost complete theme park on an island in Central America is tasked with protecting a couple of kids after a power failure causes the park\'s cloned dinosaurs to run loose.',
            Genre: 'Sci Fi',
            Director: 'Steven Spielburg',
            ImagePath: 'https://i.ytimg.com/vi_webp/f5C7dqrAItM/movieposter.webp'
          }
        ],
        selectedMovie: null
      };
    }

    setSelectedMovie(newSelectedMovie) {
      this.setState({
        selectedMovie: newSelectedMovie
      });
    }

    render() {
      const { movies, selectedMovie } = this.state;

      if (movies.length === 0){
        return <div className="main-view">The list is empty!</div>;
      } else {
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
    }
}

export default MainView;
