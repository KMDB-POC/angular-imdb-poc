import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    // canActivate: [authGuard],
    loadChildren: () =>
      import('./features/movie/movies.module').then((m) => m.MoviesModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./features/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () =>
      import('./features/signup/signup.module').then((m) => m.SignupModule),
  },
];
