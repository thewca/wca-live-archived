import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { CompetitionsComponent } from './competitions/competitions.component';
import { CommonServicesModule } from '../common-services/common-services.module';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { CompetitionComponent } from './competition/competition.component';

@NgModule({
  imports: [
    CommonModule,
    CommonServicesModule,
    CommonUiModule,
    PublicRoutingModule
  ],
  declarations: [CompetitionsComponent, CompetitionComponent],
  entryComponents: [CompetitionsComponent]
})
export class PublicModule { }
