import { Component, Input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

import { MovieCard } from '@features/movie/movie-card/movie-card.model';

@Component({
  selector: 'movie-card',
  templateUrl: './movie-card.component.html',
  imports: [RouterLink, NgIf],
  standalone: true,
  styleUrls: ['./movie-card.component.css'],
})
export class MovieCardComponent {
  @Input() card: MovieCard | undefined;
  @Input() isLoading = false;

  select = output<MovieCard>();
}
