import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { ImporterComponent } from './importer/importer.component';

const routes: Routes = [
  {
    path: 'import',
    component: ImporterComponent
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
