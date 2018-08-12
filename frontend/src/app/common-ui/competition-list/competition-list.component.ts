import { Component, OnInit, Input } from '@angular/core';
import { Competition } from '../../models/competition.model';

@Component({
  selector: 'wca-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {

  @Input() competitions: Competition[];
  @Input() baseHref: string;

  constructor() { }

  ngOnInit() {
  }

}
