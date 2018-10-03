import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { ResultService } from '../../common-services/result/result.service';

@Component({
  selector: 'wca-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public results$: Observable<any[]>;

  constructor(private route: ActivatedRoute, private readonly _resultService: ResultService) {

    this.results$ = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => this._resultService.getForRound(params.get('id'),params.get('roundId')))
    );
  }

  ngOnInit() {
  }
}
