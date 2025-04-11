import { Component, Input } from '@angular/core';
import { MovieCardComponent } from './movie-card.component';
import { MovieList } from '../models/ui/movie-list.model';
import { NgFor } from '@angular/common';

@Component({
  selector: 'movie-list',
  template: `
    @if (list) {
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center"
    >
      <ng-container *ngFor="let card of list.movies; let i = index">
        <movie-card [card]="list.movies[i]"></movie-card>
      </ng-container>
    </div>
    }
  `,
  standalone: true,
  imports: [MovieCardComponent, NgFor],
})
export class MovieListComponent {
  @Input() list: MovieList | undefined;
}
