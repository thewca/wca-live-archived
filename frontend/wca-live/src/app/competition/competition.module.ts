import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CompetitionRoutingModule } from './competition-routing.module';
import { CompetitionListComponent } from './competition-list/competition-list.component';
import { CommonUiModule } from '../common-ui/common-ui.module';
import { CommonServicesModule } from '../common-services/common-services.module';
import { ImporterComponent } from './importer/importer.component';

@NgModule({
  imports: [
    CommonModule,
    CompetitionRoutingModule,
    CommonServicesModule,
    CommonUiModule
  ],
  declarations: [CompetitionListComponent,
    ImporterComponent
]
})
export class CompetitionModule { }
