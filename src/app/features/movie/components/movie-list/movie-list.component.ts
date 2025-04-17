import { Component, Input, output } from '@angular/core';
import { NgFor } from '@angular/common';

import { MovieCardComponent } from '@features/movie/components/movie-card/movie-card.component';
import { MovieList } from '@features/movie/models/ui/movie-list.model';
import { MovieCard } from '@features/movie/models/ui/movie-card.model';

@Component({
  selector: 'movie-list',
  templateUrl: './movie-list.component.html',
  standalone: true,
  imports: [MovieCardComponent, NgFor],
})
export class MovieListComponent {
  @Input() list: MovieList | undefined;

  select = output<MovieCard>();
}
