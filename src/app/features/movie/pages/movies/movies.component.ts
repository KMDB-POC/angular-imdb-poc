import { Component, model } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list.component';
import { MovieList } from '../../models/ui/movie-list.model';
import { MoviesService } from '../../services/movies.service';
import { MovieSearchComponent } from '../../components/movie-search.components';
import { CommonModule, NgFor } from '@angular/common';
import { environment } from '../../../../../environments/environment.development';
import { MovieCard } from '../../models/ui/movie-card.model';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [MovieListComponent, MovieSearchComponent, NgFor, CommonModule],
  host: {
    class: 'w-full',
  },
})
export default class MoviesComponent {
  movieLists = model<MovieList | undefined>();
  currentMovie = model<MovieCard | undefined>();
  loadingState = true;

  constructor(private movieService: MoviesService) {
    this.movieService
      .get({
        sort_by: 'vote_count.desc',
        'vote_average.lte': 10,
      })
      .subscribe((movies) => {
        const movieArr: MovieCard[] = movies.results.map((movie, idx) => {
          return {
            id: idx + 1,
            title: movie.title,
            img: environment.imageUrl + movie.poster_path,
            score: Math.round(movie.vote_average * 100) / 100,
            backdrop: environment.imageUrl + movie.backdrop_path,
            overview: movie.overview,
            release_date: movie.release_date,
          };
        });
        this.movieLists.set({ movies: movieArr });
        this.currentMovie.set(movieArr[0]);
        this.loadingState = false;
      });
  }

  search(value: string) {
    this.movieService.search({ query: value }).subscribe((movies) => {
      this.loadingState = true;
      const movieArr: MovieCard[] = movies.results.map((movie, idx) => {
        return {
          id: idx + 1,
          title: movie.title,
          img: environment.imageUrl + movie.poster_path,
          score: Math.round(movie.vote_average * 100) / 100,
          backdrop: environment.imageUrl + movie.backdrop_path,
          overview: movie.overview,
          release_date: movie.release_date,
        };
      });
      this.movieLists.set({ movies: movieArr });
      this.currentMovie.set(movieArr[0]);
      this.loadingState = false;
    });
  }

  selectMovie(movie: MovieCard) {
    this.currentMovie.set(movie);
  }
}
