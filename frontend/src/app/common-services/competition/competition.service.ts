import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { CompetitionDto } from '../../models/dto/competition.dto';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  public getList(): Observable<Competition[]> {
    return this.http.get<CompetitionDto[]>(`${Constants.API_URL}api/competitions`).pipe(
      map(dtos => dtos.map(dto => Competition.fromDto(dto)))
    );
  }

  public getMy(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${Constants.API_URL}api/me/competitions`, { withCredentials: true }).pipe(
      map(comps => comps.map(comp => {
        comp.startDate = moment.utc(comp.startDate, 'YYYY-MM-DD');
        comp.endDate = moment.utc(comp.endDate, 'YYYY-MM-DD');
        return comp
      }))
    );
  }

  public import(competitionId: string): Observable<Competition> {
    return this.http.post<CompetitionDto>(`${Constants.API_URL}api/competitions/${competitionId}`, null, { withCredentials: true }).pipe(
      map(dto => dto === null ? null : Competition.fromDto(dto))
    );
  }

  public getForId(id: string): Observable<Competition> {
    return this.http.get<CompetitionDto>(`${Constants.API_URL}api/competitions/${id}`).pipe(
      map(dto => Competition.fromDto(dto))
    );
  }

  public getResults(compId: string, roundId: string): Observable<any> {
    return this.http.get<any>(`${Constants.API_URL}api/competitions/${compId}/results/${roundId}`);
  }
}
