import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { CompetitionService } from './competition/competition.service';
import { TimeService } from './time/time.service';
import { PersonService } from './person/person.service';
import { ResultService } from './result/result.service';
import { CentiToDisplayPipe } from './centiToDisplay.pipe';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    AuthService,
    CompetitionService,
    TimeService,
    PersonService,
    ResultService
  ],
  declarations: [
    CentiToDisplayPipe
  ],
  exports: [
    HttpClientModule,
    CentiToDisplayPipe
  ]
})
export class CommonServicesModule { }
