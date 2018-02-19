import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { ImporterComponent } from './importer/importer.component';
import { DetailComponent } from './detail/detail.component';
import { EventsComponent } from './events/events.component';
import { CompetitorsComponent } from './competitors/competitors.component';

const routes: Routes = [
  {
    path: 'import',
    component: ImporterComponent
  },
  {
    path: ':id',
    component: DetailComponent,
    children: [
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'competitors',
        component: CompetitorsComponent
      },
      {
        path: '',
        redirectTo: 'events'
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    component: CompetitionListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompetitionRoutingModule { }
