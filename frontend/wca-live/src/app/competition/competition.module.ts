import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { CommonServicesModule } from '../common-services/common-services.module';
import { ImporterComponent } from './importer/importer.component';
import { DetailComponent } from './detail/detail.component';
import { EventsComponent } from './events/events.component';
import { CompetitorsComponent } from './competitors/competitors.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    CommonServicesModule,
    CommonUiModule
  ],
  declarations: [CompetitionListComponent,
    ImporterComponent,
    DetailComponent,
    EventsComponent,
    CompetitorsComponent
]
})
export class CompetitionModule { }
