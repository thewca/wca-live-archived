import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CompetitionService } from './competition/competition.service';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    CompetitionService
  ],
  exports: [
    HttpClientModule
  ]
})
export class CommonServicesModule { }
