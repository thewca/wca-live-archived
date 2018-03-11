import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeService } from './time/time.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [TimeService]
})
export class CommonServicesModule { }
