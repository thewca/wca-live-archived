import { Component, OnInit } from '@angular/core';
import { Competition } from '../../../model/competition.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators/switchMap';
import { CompetitionService } from '../../common-services/competition/competition.service';

@Component({
  selector: 'wca-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public loading = true;
  public competition: Competition;

  constructor(
    private title: Title,
    private route: ActivatedRoute,
    private compSvc: CompetitionService,
    private router: Router
  ) { }

  public ngOnInit() {
    this.loadData();
  }

  private loadData() {
    this.route.paramMap.pipe(
      switchMap(params => this.compSvc.getCompetition(params.get('id')))
    ).subscribe(comp => {
      this.loading = false;
      if (comp === null) {
        this.router.navigateByUrl('/competition');
      } else {
        this.title.setTitle(comp.name);
        this.competition = comp;
      }
    });
  }

}
