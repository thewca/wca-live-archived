import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { CompetitionsComponent } from './competitions/competitions.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CompetitionComponent } from './competition/competition.component'
import { MatExpansionModule } from '@angular/material/expansion';
import { ResultsComponent } from './results/results.component';
import { CommonServicesModule } from '../common-services/common-services.module';

@NgModule({
  imports: [
    CommonModule,
    CommonServicesModule,
    AdminRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule
  ],
  declarations: [CompetitionsComponent, CompetitionComponent, ResultsComponent]
})
export class AdminModule { }
