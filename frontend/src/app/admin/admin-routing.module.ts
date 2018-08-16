import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';

const routes: Routes = [
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: '',
    redirectTo: 'competitions'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
