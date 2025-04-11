import { Component, Input } from '@angular/core';
import { MovieCard } from '../models/ui/movie-card.model';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'movie-card',
  template: `
    @if (card) {
    <div
      class="w-48 bg-gray-700 rounded-lg shadow-md flex flex-col items-center justify-center"
      [routerLink]="['/movie', card.id]"
    >
      <img
        [src]="card.img"
        alt="{{ card.title }}"
        class="w-48 h-72 object-cover rounded-lg"
      />
      <div class="flex items-center gap-2 mt-2">
        <div class="flex items-center gap-1">
          <img src="assets/star-default.svg" alt="Star" class="w-4 h-4" />
          <p class="text-white">Score: {{ card.score }}</p>
        </div>
      </div>
      <h2 class="text-lg font-medium text-white">
        {{ card.id }}. {{ card.title }}
      </h2>
    </div>
    }
  `,
  imports: [RouterLink, NgIf],
  standalone: true,
})
export class MovieCardComponent {
  @Input() card: MovieCard | undefined;
}
