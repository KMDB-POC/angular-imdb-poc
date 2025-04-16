import { Component, Input, output } from '@angular/core';
import { MovieCard } from '../models/ui/movie-card.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'movie-card',
  template: `
    @if (card) {
    <div (click)="select.emit(card)">
      <img
        [src]="card.img"
        alt="{{ card.title }}"
        class="w-48 h-72 object-cover rounded-t-lg"
      />
      <div class="flex flex-col justify-center gap-1 my-2 ml-2">
        <h2 class="text-lg font-medium text-white truncate">
          {{ card.title }}
        </h2>
        <p class="text-sm text-gray-400">
          {{ card.release_date.split('-')[0] }}
        </p>
        <div class="flex items-center gap-1">
          <p class="text-amber-300">{{ card.score }}/10</p>
        </div>
      </div>
    </div>
    }
  `,
  imports: [RouterLink, NgIf],
  standalone: true,
})
export class MovieCardComponent {
  @Input() card: MovieCard | undefined;

  select = output<MovieCard>();
}
