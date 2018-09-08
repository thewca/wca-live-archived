import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { tap } from 'rxjs/operators';
import * as moment from 'moment';

@Component({
  selector: 'wca-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  public competitions$: Observable<Competition[]>;
  public loading: string[] = [];
  public imported: string[] = [];

  constructor(
    private competitionService: CompetitionService,
    private snackbar: MatSnackBar
  ) {
    this.competitions$ = this.competitionService.getMy().pipe(
      tap(comps => comps.map(comp => {
        this.competitionService.getForId(comp.id).subscribe(c => this.imported.push(comp.id), e => true);
      }))
    );
  }

  ngOnInit() {
  }

  public import(competition: Competition) {
    this.loading.push(competition.id);
    this.competitionService.import(competition.id).subscribe((comp) => {
      if (comp === null) {
        this.showMessage('Competition successfully imported');
        this.imported.push(competition.id);
      } else {
        this.showMessage('Competition successfully updated');
      }
      let i = this.loading.indexOf(competition.id);
      this.loading.splice(i, 1);
    });
  }

  public isNow(competition: Competition): boolean {
    return moment().isBetween(competition.startDate, competition.endDate, 'day', '[]');
  }

  private showMessage(msg: string) {
    this.snackbar.open(msg, null, {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

}
