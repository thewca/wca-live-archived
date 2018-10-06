import { Component, OnInit, Input, ViewChildren, QueryList, OnChanges, SimpleChanges } from '@angular/core';
import { AverageService } from '../../../common-services/average/average.service';
import { TimeInputComponent } from '../time-input/time-input.component';

@Component({
  selector: 'wca-results-input',
  templateUrl: './results-input.component.html',
  styleUrls: ['./results-input.component.scss']
})
export class ResultsInputComponent implements OnInit, OnChanges {

  @Input('competitor')
  public selectedCompetitor: any;

  @Input()
  public competitors: any[];

  @ViewChildren(TimeInputComponent)
  private _inputs: QueryList<TimeInputComponent>;

  private _currentAttempt: number;

  private _results: number[] = [];

  public get average() {
    return this._averageService.Ao5(this._results);
  }

  public get results() {
    return this._results;
  }

  constructor(private readonly _averageService: AverageService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.competitor || changes.selectedCompetitor) {
      this._results = [];
      this.setFocussed(1);
      if (this._inputs) {
        this._inputs.forEach(input => input.reset());
      }
    }
  }

  public setFocussed(attempt: number) {
    this._currentAttempt = attempt;
    if (this._inputs) {
      this._inputs.toArray()[this._currentAttempt - 1].onFocus();
    }
  }

  public setResult(attempt: number, centi: number) {
    this._results[attempt - 1] = centi;
    if (attempt < this._inputs.length) {
      this.setFocussed(attempt + 1);
    }
  }

}
