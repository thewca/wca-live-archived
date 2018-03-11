import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttemptInputComponent } from './attempt-input/attempt-input.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [AttemptInputComponent],
  exports: [AttemptInputComponent]
})
export class CommonUiModule { }
