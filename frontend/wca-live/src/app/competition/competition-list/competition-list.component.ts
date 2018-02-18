import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { Competition } from '../../../model/competition.model';

@Component({
  selector: 'wca-competition-list',
  templateUrl: './competition-list.component.html',
  styleUrls: ['./competition-list.component.scss']
})
export class CompetitionListComponent implements OnInit {

  public loading = true;
  public competitions: Competition[] = [];

  constructor(
    private compSvc: CompetitionService
  ) { }

  public ngOnInit() {
    this.loadData();
  }

  public loadData() {
    this.compSvc.getCompetitions().subscribe(comps => {
      this.competitions = comps;
      this.loading = false;
    });
  }

}
