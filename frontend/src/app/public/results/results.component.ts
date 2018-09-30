import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, combineLatest, map } from 'rxjs/operators';
import { ResultService } from '../../common-services/result/result.service';
import { PersonService } from '../../common-services/person/person.service';

@Component({
  selector: 'wca-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public results$: Observable<any[]>;

  constructor(private route: ActivatedRoute, private readonly _resultService: ResultService, private readonly _personService: PersonService) {
    let eventId: string;
    let roundId: string;

    this.results$ = this.route.paramMap.pipe(
      map((params: ParamMap) => {
        [eventId, roundId] = params.get('roundId').split('-r');

        return [
          this._resultService.getForRound(params.get('id'),params.get('roundId')),
          this._personService.getCompetitorsForRound(params.get('id'), params.get('roundId'))
        ];
      }),
      switchMap(obs => obs[0].pipe(combineLatest(obs[1]))),
      map((resultsAndCompetitors) => {
        let results = resultsAndCompetitors[0];
        let competitors = resultsAndCompetitors[1];
        let r = results;
        competitors.forEach(c => {
          if (results.findIndex(r => r.competitorId === c.id) === -1) {
            r.push({
              competitionId: c.competitionId,
              competitorId: c.competitorId,
              registrationId: c.registrantId,
              eventId: eventId,
              round: roundId,
              competitorWcaId: c.competitor.wcaId,
              solves: [],
              average: null,
              competitor: c.competitor
            });
          }
        });
        return r;
      }),
      map(results => results.sort((a, b) => {
        if (a.average && b.average) {
          if (a.average.centiseconds < b.average.centiseconds) {
            return -1;
          }
          if (a.average.centiseconds > b.average.centiseconds) {
            return 1;
          }
        }
        if (a.average && !b.average) {
          return -1;
        }
        if (b.average && !a.average) {
          return 1;
        }
        let bestA: number;
        let bestB: number;
        a.solves.forEach(s => {
          if (bestA === null || s.centiseconds < bestA) bestA = s.centiseconds;
        });
        b.solves.forEach(s => {
          if (bestB === null || s.centiseconds < bestB) bestB = s.centiseconds;
        });
        if (bestA && bestB) {
          if (bestA < bestB) {
            return -1;
          }
          if (bestA > bestB) {
            return 1;
          }
        }
        if (bestA && !bestB) {
          return -1;
        }
        if (bestB && !bestA) {
          return 1;
        }
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



}
