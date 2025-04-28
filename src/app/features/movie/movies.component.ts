import { Component, model, OnInit } from '@angular/core';
import { MovieListComponent } from '@features/movie/movie-list/movie-list.component';
import { MovieList } from '@features/movie/movie-list/movie-list.model';
import { MoviesService } from '@features/movie/movies.service';
import { MovieSearchComponent } from '@features/movie/movie-search/movie-search.components';
import { CommonModule, NgFor } from '@angular/common';
import { environment } from '@environments/environment.development';
import { MovieCard } from '@features/movie/movie-card/movie-card.model';
import { MovieSearchResponse } from './movies.model';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [MovieListComponent, MovieSearchComponent, CommonModule],
  host: {
    class: 'w-full',
  },
})
export default class MoviesComponent implements OnInit {
  movieLists = model<MovieList | undefined>();
  currentMovie = model<MovieCard | undefined>();
  loadingState = true;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService
      .get({
        SortBy: 'VoteCountDesc',
        VoteAverageLte: 10,
      })
      .subscribe((res) => {
        this.refreshMovieList(res.result);
      });
  }

  search(value: string) {
    this.movieService.search({ Query: value }).subscribe((res) => {
      this.refreshMovieList(res.result);
    });
  }

  refreshMovieList(movies: MovieSearchResponse) {
    this.loadingState = true;
    const movieArr: MovieCard[] = movies.results.map((movie, idx) => {
      return {
        id: idx + 1,
        title: movie.title,
        img: movie.posterPath,
        score: Math.round(movie.voteAverage * 100) / 100,
        backdrop: movie.backdropPath,
        overview: movie.overview,
        release_date: movie.releaseDate,
      };
    });
    this.movieLists.set({ movies: movieArr });
    this.currentMovie.set(movieArr[0]);
    this.loadingState = false;
  }

  selectMovie(movie: MovieCard) {
    this.currentMovie.set(movie);
  }
}
