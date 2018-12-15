import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap, tap } from 'rxjs/operators';
import { ResultService } from '../../common-services/result/result.service';

@Component({
  selector: 'wca-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  public results$: Observable<any[]>;

  private _eventId: string;

  constructor(
    private route: ActivatedRoute,
    private readonly _resultService: ResultService
  ) {}

  ngOnInit() {
    this.results$ = this.route.paramMap.pipe(
      tap(params => (this._eventId = params.get('roundId').split('-')[0])),
      switchMap((params: ParamMap) =>
        this._resultService.getForRound(params.get('id'), params.get('roundId'))
      )
    );
  }

  public isBest(result: any, attempt: number): boolean {
    const res = result.attempts[attempt].result;
    return (
      res === this.getBest(result) &&
      (result.attempts.map(a => a.result) as number[]).indexOf(res) === attempt
    );
  }

  public getBest(result: any): number {
    return Math.min(...result.attempts.map(a => a.result).filter(r => r > 0));
  }

  public isPR(
    result: any,
    attempt: number,
    type: 'single' | 'average' = 'single'
  ): boolean {
    const eventBests = result.competitor.personalBests.filter(
      pb => pb.eventId === this._eventId && pb.type === type
    );
    if (!result.competitor || eventBests.length === 0) {
      return type === 'single' ? this.isBest(result, attempt) : true;
    }
    switch (type) {
      case 'single':
        const res = result.attempts[attempt].result;
        return this.isBest(result, attempt) && res < eventBests[0].best;
      case 'average':
        return result.average.result < eventBests[0].best;
    }
  }
}
