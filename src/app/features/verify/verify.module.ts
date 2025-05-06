import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import VerifyComponent from './verify.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: VerifyComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class VerifyModule {}
