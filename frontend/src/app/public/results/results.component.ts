import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'wca-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public competition$: Observable<Competition>;
  public results$: Observable<any>;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) {
    this.competition$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getForId(params.get('id')))
    );
    this.results$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getResults(params.get('id'), params.get('roundId')))
    );
  }

  ngOnInit() {
  }

}
