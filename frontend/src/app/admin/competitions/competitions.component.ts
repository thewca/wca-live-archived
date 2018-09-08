import { Component, OnInit } from '@angular/core';
import { CompetitionService } from '../../common-services/competition/competition.service';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'wca-competitions',
  templateUrl: './competitions.component.html',
  styleUrls: ['./competitions.component.scss']
})
export class CompetitionsComponent implements OnInit {

  public competitions$: Observable<Competition[]>;
  public loading: string[] = [];

  constructor(
    private competitionService: CompetitionService,
    private snackbar: MatSnackBar
  ) {
    this.competitions$ = this.competitionService.getMy();
  }

  ngOnInit() {
  }

  public import(competition: Competition) {
    this.loading.push(competition.id);
    this.competitionService.import(competition.id).subscribe((comp) => {
      if (comp === null) {
        this.showMessage('Competition successfully imported');
      } else {
        this.showMessage('Competition successfully updated');
      }
      let i = this.loading.indexOf(competition.id);
      this.loading.splice(i, 1);
    });
  }

  private showMessage(msg: string) {
    this.snackbar.open(msg, null, {
      duration: 4000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }

}
