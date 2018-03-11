import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttemptInputComponent } from './attempt-input/attempt-input.component';
import { FormsModule } from '@angular/forms';
import { MultiAttemptInputComponent } from './multi-attempt-input/multi-attempt-input.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AttemptInputComponent, MultiAttemptInputComponent],
  exports: [AttemptInputComponent]
})
export class CommonUiModule { }
