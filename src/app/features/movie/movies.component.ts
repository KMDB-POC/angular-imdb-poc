import { Component, model, OnInit } from '@angular/core';
import { MovieListComponent } from '@features/movie/movie-list/movie-list.component';
import { MovieList } from '@features/movie/movie-list/movie-list.model';
import { MoviesService } from '@features/movie/movies.service';
import { MovieSearchComponent } from '@features/movie/movie-search/movie-search.components';
import { CommonModule, NgFor } from '@angular/common';
import { environment } from '@environments/environment.development';
import { MovieCard } from '@features/movie/movie-card/movie-card.model';
import { MovieSearchResponse } from './movies.model';
import { VideoListComponent } from './video-list/video-list.component';
import { VideoList } from './video-list/video-list.model';
import { VideoCard } from './video-card/video-card.model';
import { formatDate } from 'date-fns';
import { take } from 'rxjs';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
  standalone: true,
  imports: [
    MovieListComponent,
    MovieSearchComponent,
    VideoListComponent,
    CommonModule,
  ],
})
export default class MoviesComponent implements OnInit {
  movieLists = model<MovieList | undefined>();
  videoLists = model<VideoList | undefined>();

  currentMovie = model<MovieCard | undefined>();
  loadingState = true;

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.loadPopularMovies();
    this.loadLatestTrailers();
  }

  loadPopularMovies() {
    this.movieService
      .get({
        SortBy: 'VoteCountDesc',
        VoteAverageLte: 10,
      })
      .subscribe((res) => {
        this.refreshMovieList(res.result);
      });
  }

  loadLatestTrailers() {
    const today = new Date();
    const latestMovies = this.movieService.get({
      SortBy: 'PopularityDesc',
      ReleaseDateLte: formatDate(today, 'yyyy-MM-dd'),
      ReleaseDateGte: formatDate(
        today.setDate(today.getDate() - 30),
        'yyyy-MM-dd'
      ),
    });
    latestMovies.subscribe((res) => {
      const latestVideos: VideoCard[] = [];
      for (let i = 0; i < (res.result?.results.length ?? 0); i++) {
        const movie = res.result?.results[i];
        const video = movie ? this.movieService.getVideos(movie.id) : [];

        video.forEach((videoRes) => {
          if (latestVideos.length >= 4) {
            return;
          }
          const trailer = videoRes.result?.results.find(
            (v) => v.type === 'Trailer'
          );
          if (trailer && movie) {
            const videoCard: VideoCard = {
              id: 1,
              title: movie.title,
              img: movie.backdropPath,
              publishedAt: trailer.publishedAt,
              youtubeUrl: trailer.youtubeUrl,
            };
            latestVideos.push(videoCard);
          }
        });
      }
      this.videoLists.set({ videos: latestVideos });
    });
  }

  search(value: string) {
    if (value.length > 0) {
      this.movieService.search({ Query: value }).subscribe((res) => {
        if (res.result) {
          this.refreshMovieList(res.result);
        }
      });
    } else {
      this.movieService
        .get({
          SortBy: 'VoteCountDesc',
          VoteAverageLte: 10,
        })
        .subscribe((res) => {
          if (res.result) {
            this.refreshMovieList(res.result);
          }
        });
    }
  }

  refreshMovieList(movies: MovieSearchResponse | null) {
    this.loadingState = true;
    const movieArr: MovieCard[] =
      movies?.results.map((movie, idx) => {
        return {
          id: idx + 1,
          title: movie.title,
          img: movie.posterPath,
          score: Math.round(movie.voteAverage * 100) / 100,
          backdrop: movie.backdropPath,
          overview: movie.overview,
          release_date: movie.releaseDate,
        };
      }) || [];
    this.movieLists.set({ movies: movieArr });
    this.currentMovie.set(movieArr[0]);
    this.loadingState = false;
  }

  selectMovie(movie: MovieCard) {
    this.currentMovie.set(movie);
  }
}
