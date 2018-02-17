import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule
  ]
})
export class CommonUiModule { }
