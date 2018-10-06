import { Component, OnInit, Input, ViewChildren, QueryList, OnChanges, SimpleChanges, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { AverageService } from '../../../common-services/average/average.service';
import { TimeInputComponent } from '../time-input/time-input.component';
import { Round } from '../../../models/round.model';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'wca-results-input',
  templateUrl: './results-input.component.html',
  styleUrls: ['./results-input.component.scss']
})
export class ResultsInputComponent implements OnInit, OnChanges {

  @Input('competitor')
  public selectedCompetitor: any;

  @Input()
  public round: Round;

  @Input()
  public competitors: any[];

  @ViewChild('save')
  private _saveButton: MatButton;

  @ViewChildren(TimeInputComponent)
  private _inputs: QueryList<TimeInputComponent>;

  private _currentAttempt: number;

  private _results: number[] = [];

  public get average() {
    if (!this.round || !this.round.format) {
      return null;
    }
    switch (this.round.format) {
      case 'a':
        return this._averageService.Ao5(this._results);
      case 'm':
        return this._averageService.Mo3(this._results);
      default:
        return null;
    }
  }

  public get results() {
    return this._results;
  }

  public get madeCutoff(): boolean {
    if (!this.round) {
      return false;
    }
    if (!this.round.cutoff) {
      return true;
    }
    for (var i = 0; i < this.round.cutoff.numberOfAttempts; i++) {
      if (this._results[i] < this.round.cutoff.attemptResult) {
        return true;
      }
    }
    return false;
  }

  public get cutoffAttempts(): number {
    return this.round.cutoff ? this.round.cutoff.numberOfAttempts : 5;
  }

  public get numAttempts(): number {
    if (!this.round || !this.round.format) {
      return 0;
    }
    switch (this.round.format) {
      case 'a':
        return 5;
      case 'm':
      case '3':
        return 3;
      case '2':
        return 2;
      case '1':
        return 1;
      default:
        return 5;
    }
  }

  public get inputComplete(): boolean {
    return this._results.length === this.numAttempts || (!this.madeCutoff && this._results.length === this.cutoffAttempts);
  }

  constructor(private readonly _averageService: AverageService, private readonly _cd: ChangeDetectorRef) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.competitor || changes.selectedCompetitor) {
      this._cd.detectChanges();
      this._results = [];
      this.setFocussed(1);
      if (this._inputs) {
        this._inputs.forEach(input => input.reset());
      }
    }
  }

  public isAttemptDisabled(attempt: number): boolean {
    if (!this.selectedCompetitor) {
      return true;
    }
    if (attempt <= this.cutoffAttempts || this.madeCutoff) {
      return false;
    }
    return true;
  }

  public setFocussed(attempt: number) {
    this._currentAttempt = attempt;
    if (this._inputs) {
      let input = this._inputs.toArray()[this._currentAttempt - 1];
      if (input) input.onFocus();
    }
  }

  public setResult(attempt: number, centi: number) {
    this._results[attempt - 1] = centi;
    this._cd.detectChanges();
    if (attempt < this.numAttempts) {
      this.setFocussed(attempt + 1);
    } else if (this._saveButton) {
      this._saveButton.focus();
    }
  }

  public saveResults() {
    console.log('saveResults');
    console.log(this.results, this.selectedCompetitor);
  }

}
