import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CompetitionComponent } from './competition/competition.component';
import { ResultsComponent } from './results/results.component';

const routes: Routes = [
  {
    path: 'competitions',
    component: CompetitionsComponent
  },
  {
    path: 'competition/:id',
    children: [
      {
        path: '',
        component: CompetitionComponent
      },
      {
        path: 'results/:roundId',
        component: ResultsComponent
      }
    ]
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
