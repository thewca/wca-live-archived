import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'wca-competitor-search',
  templateUrl: './competitor-search.component.html',
  styleUrls: ['./competitor-search.component.scss']
})
export class CompetitorSearchComponent implements OnInit, OnChanges {
  // tslint:disable-next-line:no-input-rename
  @Input('competitors')
  private _competitors: any[];

  // tslint:disable-next-line:no-output-rename
  @Output('change')
  public competitorChange = new EventEmitter<any>();

  @Input()
  public competitor: any;

  public options$: Observable<any[]>;

  public input = new FormControl();

  @ViewChild('htmlInput')
  private _htmlInput: MatInput;

  constructor() {}

  ngOnInit() {
    this.options$ = this.input.valueChanges.pipe(
      startWith(''),
      map(v => this._filter(v))
    );

    this.input.valueChanges.subscribe(v => {
      if (
        (v && v.name && v.id && v !== this.competitor && !v.preventDefault) ||
        v === null
      ) {
        this.competitor = v;
        this.competitorChange.emit(v);
      }
    });
  }

  public selected($event) {
    const competitor = $event.option.value;
    this.competitor.value = competitor;
    this.competitorChange.emit(competitor);
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (
      changes.competitor &&
      (changes.competitor.currentValue == null ||
        changes.competitor.currentValue === undefined ||
        !changes.competitor.currentValue.preventDefault)
    ) {
      this.input.setValue(changes.competitor.currentValue);
    }
  }

  public displayFn(competitor?: any): string {
    if (competitor && competitor.preventDefault) {
      return this.competitor
        ? `${this.competitor.registrationId} (${this.competitor.name})`
        : '';
    }
    return competitor
      ? `${competitor.registrationId} (${competitor.name})`
      : '';
  }

  public focus() {
    this._htmlInput.focus();
  }

  private _filter(value: string): any[] {
    return this._competitors.filter(c => {
      if (value && value.toLowerCase) {
        return (
          `${c.registrationId}` === value ||
          c.name.toLowerCase().indexOf(value.toLowerCase()) > -1
        );
      } else {
        return false;
      }
    });
  }
}
