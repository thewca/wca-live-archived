import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PersonService } from '../../common-services/person/person.service';
import { EventId, ValidEventId } from '../../models/eventId.class';
import { Person } from '../../models/person.model';

@Component({
  selector: 'wca-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  public competition$: Observable<Competition>;
  public results$: Observable<any>;
  public competitors$: Observable<Person[]>;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute, private personService: PersonService) {
    this.competition$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getForId(params.get('id')))
    );
    this.results$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getResults(params.get('id'), params.get('roundId')))
    );
    this.competitors$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.personService.getCompetitors(params.get('id'), params.get('roundId').split('-')[0] as ValidEventId))
    );
  }

  ngOnInit() {
  }

}
