import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/movie/movies.module').then((m) => m.MoviesModule),
  },
];
