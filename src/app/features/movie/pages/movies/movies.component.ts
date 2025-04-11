import { Component, model } from '@angular/core';
import { MovieListComponent } from '../../components/movie-list.component';
import { MovieList } from '../../models/ui/movie-list.model';
import { MoviesService } from '../../services/movies.service';
import { MovieSearchComponent } from '../../components/movie-search.components';
import { NgFor } from '@angular/common';

@Component({
  selector: 'movies',
  templateUrl: './movies.component.html',
  standalone: true,
  imports: [MovieListComponent, MovieSearchComponent, NgFor],
})
export default class MoviesComponent {
  movieLists = model<MovieList | undefined>();
  loadingState = true;

  constructor(private movieService: MoviesService) {}

  search(value: string) {
    this.movieService.search(value).subscribe((movies) => {
      this.loadingState = true;
      const movieArr = movies.map((movie, idx) => {
        return {
          id: idx + 1,
          title: movie['#TITLE'],
          img: movie['#IMG_POSTER'],
          score: movie['#RANK'],
        };
      });
      this.movieLists.set({ movies: movieArr });
      this.loadingState = false;
    });
  }
}
