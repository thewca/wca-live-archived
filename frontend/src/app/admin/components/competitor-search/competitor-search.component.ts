import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'wca-competitor-search',
  templateUrl: './competitor-search.component.html',
  styleUrls: ['./competitor-search.component.scss']
})
export class CompetitorSearchComponent implements OnInit, OnChanges {

  @Input('competitors')
  private _competitors: any[];

  @Output('change')
  public competitorChange = new EventEmitter<any>();

  @Input()
  public competitor: any;

  public options$: Observable<any[]>;

  public input = new FormControl();

  constructor() { }

  ngOnInit() {
    this.options$ = this.input.valueChanges.pipe(
      startWith(''),
      map(v => this._filter(v))
    );

    this.input.valueChanges.subscribe(v => {
      if ((v && v.name && v.id && v !== this.competitor && !v.preventDefault) || v === null) {
        this.competitor = v;
        this.competitorChange.emit(v);
      }
    });
  }

  public ngOnChanges(changes: SimpleChanges) {
    if (changes.competitor && changes.competitor.currentValue && !changes.competitor.currentValue.preventDefault) {
      this.input.setValue(changes.competitor.currentValue);
    }
  }

  public displayFn(competitor?: any): string {
    if (competitor && competitor.preventDefault) {
      return this.competitor ? `${this.competitor.registrationId} (${this.competitor.name})` : '';
    }
    return competitor ? `${competitor.registrationId} (${competitor.name})` : '';
  }

  private _filter(value: string): any[] {
    return this._competitors.filter(c => {
      if (value && value.toLowerCase) {
        return `${c.registrationId}`.startsWith(value) || c.name.toLowerCase().indexOf(value.toLowerCase()) > -1;
      } else {
        return false;
      }
    });
  }

}
