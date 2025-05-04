import { Component, Input, output } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

import { MovieCardComponent } from '@features/movie/movie-card/movie-card.component';
import { MovieList } from '@features/movie/movie-list/movie-list.model';
import { MovieCard } from '@features/movie/movie-card/movie-card.model';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  imports: [MovieCardComponent, NgFor, NgIf],
  styleUrls: ['./movie-list.component.css'],
})
export class MovieListComponent {
  @Input() list: MovieList | undefined;
  @Input() isLoading = false;

  loadingCards = new Array(12);

  select = output<MovieCard>();
}
