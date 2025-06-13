import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TestForm } from './test-form/test-form';

const routes: Routes = [
  {
    path: '',
    component: TestForm
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
