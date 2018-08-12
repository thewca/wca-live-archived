import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'wca-competition',
  templateUrl: './competition.component.html',
  styleUrls: ['./competition.component.scss']
})
export class CompetitionComponent implements OnInit {

  public competition$: Observable<any>;

  constructor(private competitionService: CompetitionService, private route: ActivatedRoute) {
    this.competition$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this.competitionService.getForId(params.get('id')))
    );
  }

  ngOnInit() {
  }

}
