import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompetitionService } from './competition/competition.service';
import { AuthService } from './auth/auth.service';
import { EventNamePipe } from './event-name/eventName.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EventNamePipe
  ],
  providers: [CompetitionService, AuthService],
  exports: [
    EventNamePipe
  ]
})
export class CommonServicesModule { }
