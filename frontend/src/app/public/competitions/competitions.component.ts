import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';

@Component({
  selector: 'wca-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  public competitions$;

  constructor(private competitionService: CompetitionService) { }

  ngOnInit() {
    this.competitions$ = this.competitionService.getList();
  }

}
