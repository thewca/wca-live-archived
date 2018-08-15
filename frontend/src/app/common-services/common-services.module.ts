import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CompetitionService } from './competition/competition.service';
import { TimeService } from './time/time.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    CompetitionService,
    TimeService
  ],
  exports: [
    HttpClientModule
  ]
})
export class CommonServicesModule { }
