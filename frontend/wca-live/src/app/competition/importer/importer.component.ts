import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Competition } from '../../../model/competition.model';
import { AuthService } from '../../common-services/auth/auth.service';
import { CompetitionService } from '../../common-services/competition/competition.service';

@Component({
  selector: 'wca-importer',
  templateUrl: './importer.component.html',
  styleUrls: ['./importer.component.scss']
})
export class ImporterComponent implements OnInit {

  public competitions: Competition[] = [];
  public importing: {[id: string]: boolean} = {};
  public imported: {[id: string]: boolean} = {};

  constructor(
    private title: Title,
    private auth: AuthService,
    private compSvc: CompetitionService
  ) { }

  public ngOnInit() {
    this.title.setTitle('WCA Live - Import competition');
    this.loadData();
  }

  public importComp(comp: Competition) {
    this.importing[comp.id] = true;
    this.compSvc.importCompetition(comp).subscribe(() => {
      this.importing[comp.id] = false;
      this.imported[comp.id] = true;
    });
  }

  private loadData() {
    this.auth.getMyCompetitions().subscribe(comps => {
      comps.forEach(comp => this.importing[comp.id] = false);
      comps.forEach(comp => this.imported[comp.id] = false);
      this.competitions = comps;
    });
  }

}
