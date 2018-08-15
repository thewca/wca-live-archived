import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { RoundName } from '../../models/roundName.class';
import { Event } from '../../models/event.model';
import { Round } from '../../models/round.model';
import { Competition } from '../../models/competition.model';

@Component({
  selector: 'wca-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  public competition$: Observable<Competition>;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) {
    this.competition$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getForId(params.get('id')))
    );
  }

  ngOnInit() {
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

}
