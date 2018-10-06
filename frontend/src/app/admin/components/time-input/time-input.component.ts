import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChild, ElementRef } from '@angular/core';
import { TimeService } from '../../../common-services/time/time.service';

@Component({
  selector: 'wca-time-input',
  templateUrl: './time-input.component.html',
  styleUrls: ['./time-input.component.scss']
})
export class TimeInputComponent implements OnInit {

  @Input()
  public attempt: number;

  @Input()
  public disabled: boolean = false;

  @Output()
  public changed: EventEmitter<number> = new EventEmitter<number>();

  @Output()
  public focus: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('input')
  private _input: ElementRef<HTMLInputElement>;

  @HostListener('focus')
  public onFocus() {
    this._input.nativeElement.focus();
  }

  constructor(private readonly _timeService: TimeService) { }

  ngOnInit() {
  }

  public reset() {
    this._input.nativeElement.value = '';
  }

  @HostListener('keydown.enter')
  @HostListener('keydown.tab')
  @HostListener('blur')
  public _done() {
    this.changed.emit(this._timeService.inputToCenti(this._input.nativeElement.value));
  }

}
