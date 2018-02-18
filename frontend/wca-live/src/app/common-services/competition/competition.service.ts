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

  public importCompetition(comp: Competition): Observable<boolean> {
    const url = `${Settings.apiBaseUrl}/api/competitions/${comp.id}`;
    return this.http.post<any>(url, null, {
      withCredentials: true,
      observe: 'response'
    }).pipe(
      map(response => response.status === 200)
    );
  }

}
