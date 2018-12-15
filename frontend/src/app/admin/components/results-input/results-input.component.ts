import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
  ViewChildren
} from '@angular/core';
import { MatButton } from '@angular/material/button';
import { Ao5, Mo3 } from '@wca/helpers';
import { ResultService } from '../../../common-services/result/result.service';
import { Round } from '../../../models/round.model';
import { CompetitorSearchComponent } from '../competitor-search/competitor-search.component';
import { TimeInputComponent } from '../time-input/time-input.component';

@Component({
  selector: 'wca-results-input',
  templateUrl: './results-input.component.html',
  styleUrls: ['./results-input.component.scss']
})
export class ResultsInputComponent implements OnInit, OnChanges {
  @Input()
  public competitionId: string;

  // tslint:disable-next-line:no-input-rename
  @Input('competitor')
  public selectedCompetitor: any;

  @Input()
  public round: Round;

  @Input()
  public competitors: any[];

  @Output()
  public done: EventEmitter<void> = new EventEmitter<void>();

  @ViewChild('save')
  private _saveButton: MatButton;

  @ViewChild(CompetitorSearchComponent)
  private _search: CompetitorSearchComponent;

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
        return Ao5(this._results);
      case 'm':
        return Mo3(this._results);
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
    for (let i = 0; i < this.round.cutoff.numberOfAttempts; i++) {
      if (
        this.results[i] > 0 &&
        this._results[i] < this.round.cutoff.attemptResult
      ) {
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
    return (
      this._results.length === this.numAttempts ||
      (!this.madeCutoff && this._results.length === this.cutoffAttempts)
    );
  }

  constructor(
    private readonly _cd: ChangeDetectorRef,
    private readonly _resultService: ResultService
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.competitor || changes.selectedCompetitor) {
      this._reset();
      this.selectedCompetitor = (
        changes.competitor || changes.selectedCompetitor
      ).currentValue;
      this._cd.detectChanges();
      if (document.activeElement) {
        (document.activeElement as any).blur();
      }
      this.setFocussed(1);
    }
  }

  public setSelectedCompetitor(competitor: any) {
    if (competitor == null || competitor.registrationId) {
      this._reset();
      this.selectedCompetitor = competitor;
      this._cd.detectChanges();
      if (document.activeElement) {
        (document.activeElement as any).blur();
      }
      this.setFocussed(1);
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
    if (attempt === 0) {
      return this._search.focus();
    }
    if (this._inputs) {
      const input = this._inputs.toArray()[this._currentAttempt - 1];
      if (input) {
        input.onFocus();
      }
    }
  }

  public setResult(attempt: number, centi: number) {
    if (centi == null || centi === undefined || Number.isNaN(centi)) {
      return;
    }
    this._results[attempt - 1] = centi;
    this._cd.detectChanges();
    if (attempt < this.numAttempts) {
      this.setFocussed(attempt + 1);
    } else if (this._saveButton) {
      this._saveButton.focus();
    }
  }

  public saveResults() {
    this._resultService
      .saveResult(
        this.competitionId,
        this.round.id,
        this.selectedCompetitor.registrationId,
        this._results
      )
      .subscribe(() => {
        this._reset();
        this.selectedCompetitor = null;
        this.done.emit();
        this._cd.detectChanges();
        this._search.focus();
      });
  }

  private _reset() {
    this._results = [];
    this._currentAttempt = 1;
    if (this._inputs) {
      this._inputs.forEach(input => input.reset());
    }
    this._cd.detectChanges();
  }
}
