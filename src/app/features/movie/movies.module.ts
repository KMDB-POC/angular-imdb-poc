import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import MoviesComponent from './movies.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: MoviesComponent,
      },
    ]),
  ],
})
export class MoviesModule {}
