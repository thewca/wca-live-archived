import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'wca-competitor-search',
  templateUrl: './competitor-search.component.html',
  styleUrls: ['./competitor-search.component.scss']
})
export class CompetitorSearchComponent implements OnInit {

  @Input('competitors')
  private _competitors: any[];

  @Output()
  public competitorChange = new EventEmitter<any>();

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
      if (v && v.name && v.id && v !== this.competitor) {
        this.competitor = v;
        this.competitorChange.emit(v);
      }
    });
  }

  public displayFn(competitor?: any): string | undefined {
    return competitor ? competitor.registrationId : undefined;
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
