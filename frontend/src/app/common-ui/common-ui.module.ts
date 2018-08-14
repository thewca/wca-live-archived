import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule.forChild([])
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    CompetitionListComponent
  ],
  declarations: [CompetitionListComponent]
})
export class CommonUiModule { }
