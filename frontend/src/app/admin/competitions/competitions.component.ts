import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';

@Component({
  selector: 'wca-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  public competitions$: Observable<Competition[]>;

  constructor(private competitionService: CompetitionService) {
    this.competitions$ = this.competitionService.getMy();
  }

  ngOnInit() {
  }

}
