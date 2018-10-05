import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wca-results-input',
  templateUrl: './results-input.component.html',
  styleUrls: ['./results-input.component.scss']
})
export class ResultsInputComponent implements OnInit {

  @Input('competitor')
  public selectedCompetitor: any;

  @Input()
  public competitors: any[];

  constructor() { }

  ngOnInit() {
  }

}
