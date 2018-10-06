import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { ResultService } from '../../common-services/result/result.service';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { Round } from '../../models/round.model';

@Component({
  selector: 'wca-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public results$: Observable<any[]>;
  public competitors$: Observable<any[]>;
  public round$: Observable<Round>;
  public selectedCompetitor: any;
  public competitionId: string;

  constructor(
    private route: ActivatedRoute,
    private readonly _resultService: ResultService,
    private readonly _competitionService: CompetitionService
  ) {}

  ngOnInit() {
    this.loadRound();
    this.loadResults();
    this.loadCompetitors();

    this.route.paramMap.subscribe(params => this.competitionId = params.get('id'));
  }

  public selectCompetitor(result) {
    this.selectedCompetitor = { ...result.competitor, registrationId: result.registrationId };
  }

  public loadRound() {
    this.round$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this._competitionService.getForId(params.get('id')).pipe(
        map(c => {
          let [eventId, roundId] = params.get('roundId').split('-r');
          return c.events.filter(e => e.id.value === eventId)[0].rounds.filter(r => r.id === params.get('roundId'))[0];
        })
      ))
    );
  }

  public loadResults() {
    this.results$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this._resultService.getForRound(params.get('id'),params.get('roundId')))
    );
  }

  public loadCompetitors() {
    this.competitors$ = this.results$.pipe(
      map(results => results.map(r => {
        return { ...r.competitor, registrationId: r.registrationId };
      }))
    );
  }
}
