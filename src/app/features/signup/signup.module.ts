import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import LoginComponent from './signup.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: LoginComponent,
      },
    ]),
  ],
})
export class LoginModule {}
