import { Component, Input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MovieCard } from '@features/movie/models/ui/movie-card.model';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  imports: [RouterLink, NgIf],
  standalone: true,
})
export class MovieCardComponent {
  @Input() card: MovieCard | undefined;

  select = output<MovieCard>();
}
