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
import { CompetitorSearchComponent } from './components/competitor-search/competitor-search.component';
import { ResultsInputComponent } from './components/results-input/results-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TimeInputComponent } from './components/time-input/time-input.component';
import { TimePipe } from './pipes/time/time.pipe';

@NgModule({
  imports: [
    CommonModule,
    CommonServicesModule,
    AdminRoutingModule,
    MatButtonModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule
  ],
  declarations: [CompetitionsComponent, CompetitionComponent, ResultsComponent, CompetitorSearchComponent, ResultsInputComponent, TimeInputComponent, TimePipe]
})
export class AdminModule { }
