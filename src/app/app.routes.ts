import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/movie/pages/movies/movies.component'),
  },
];
