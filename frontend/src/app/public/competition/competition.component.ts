import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { RoundName } from '../../models/roundName.class';
import { Event } from '../../models/event.model';
import { Round } from '../../models/round.model';
import { Competition } from '../../models/competition.model';
import { PersonService } from '../../common-services/person/person.service';
import { ResultService } from '../../common-services/result/result.service';

@Component({
  selector: 'wca-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  public competition$: Observable<Competition>;
  public registrations$: Observable<any>;

  constructor(
    private competitionService: CompetitionService,
    private route: ActivatedRoute,
    private readonly _personService: PersonService,
    private readonly _resultService: ResultService
  ) {
    this.competition$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getForId(params.get('id')))
    );
    this.registrations$ = this.competition$.pipe(
      switchMap(competition => this._personService.getForCompetition(competition.id)),
      map(registrations => registrations.sort((a, b) => {
        if (a.competitor.name < b.competitor.name) {
          return -1;
        }
        if (a.competitor.name > b.competitor.name) {
          return 1;
        }
        return 0;
      }))
    );
  }

  ngOnInit() {
  }

  public getResults(competitionId: string, registrantId: number): Observable<any[]> {
    return this._resultService.getForCompetitor(competitionId, registrantId);
  }

  public roundName(roundId: string, numRounds: number): string {
    let [ev, r] = roundId.split('-r');
    let round = parseInt(r, 10);
    return RoundName.getRoundName(round, numRounds);
  }

  public eventTracker(_ix: number, event: Event): string {
    return event.id.toString();
  }

  public roundTracker(_ix: number, round: Round): string {
    return round.id;
  }

  public registrationTracker(_ix: number, registration: any): number {
    return registration.registrantId;
  }

}
