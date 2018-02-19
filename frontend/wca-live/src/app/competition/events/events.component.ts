import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Competition } from '../../../model/competition.model';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { switchMap } from 'rxjs/operators/switchMap';

@Component({
  selector: 'wca-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  public loading = true;
  public competition: Competition;

  constructor(
    private route: ActivatedRoute,
    private compSvc: CompetitionService
  ) { }

  public ngOnInit() {
    if (this.route.parent) {
      this.route.parent.paramMap.pipe(
        switchMap(params => this.compSvc.getCompetition(params.get('id')))
      ).subscribe(comp => {
        this.loading = false;
        if (comp) {
          this.competition = comp;
        }
      });
    }
  }

}
