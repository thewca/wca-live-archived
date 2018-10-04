import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wca-competitor-search',
  templateUrl: './competitor-search.component.html',
  styleUrls: ['./competitor-search.component.scss']
})
export class CompetitorSearchComponent implements OnInit {

  @Input()
  private _competitors: any[];

  constructor() { }

  ngOnInit() {
  }

}
