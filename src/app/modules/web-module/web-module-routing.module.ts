import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ResultPageComponent } from './result-page/result-page.component';

const routes: Routes = [
  {
    path: 'quiz',
    component: HomeComponent,
    pathMatch: 'full'
  },

  {
    path: 'results',
    component: ResultPageComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebModuleRoutingModule { }
