import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Competition } from '../../../model/competition.model';
import { HttpClient } from '@angular/common/http';
import { CompetitionDto } from '../../../model/dto/competition.dto';
import { map } from 'rxjs/operators/map';
import { Settings } from '../../common-services/settings.service';

@Injectable()
export class CompetitionService {

  constructor(
    private http: HttpClient
  ) { }

  public getCompetitions(): Observable<Competition[]> {
    const url = `${Settings.apiBaseUrl}/api/competitions`;
    return this.http.get<CompetitionDto[]>(url).pipe(
      map(dtos => dtos.map(dto => Competition.fromDto(dto)))
    );
  }

}
