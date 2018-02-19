import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';

@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ],
  declarations: [],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatTabsModule
  ]
})
export class CommonUiModule { }
