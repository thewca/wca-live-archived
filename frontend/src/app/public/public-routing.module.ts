import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionComponent } from './competition/competition.component';

const routes: Routes = [
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: 'competition/:id',
    component: CompetitionComponent
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
export class PublicRoutingModule { }
