import { Component, Input, output } from '@angular/core';
import { MovieCardComponent } from './movie-card.component';
import { MovieList } from '../models/ui/movie-list.model';
import { NgFor } from '@angular/common';
import { MovieCard } from '../models/ui/movie-card.model';

@Component({
  selector: 'movie-list',
  template: `
    @if (list) {
    <div
      class="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 justify-center"
    >
      <ng-container *ngFor="let card of list.movies; let i = index">
        <movie-card
          [card]="list.movies[i]"
          (select)="select.emit($event)"
          class="hover:scale-105 transition-transform duration-200 ease-in-out w-48 h-auto bg-gray-800 rounded-lg shadow-md cursor-pointer"
        ></movie-card>
      </ng-container>
    </div>
    }
  `,
  standalone: true,
  imports: [MovieCardComponent, NgFor],
})
export class MovieListComponent {
  @Input() list: MovieList | undefined;

  select = output<MovieCard>();
}
