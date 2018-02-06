import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionService } from './competition/competition.service';
import { AuthService } from './auth/auth.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [CompetitionService, AuthService]
})
export class CommonServicesModule { }
