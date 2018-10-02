import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { CompetitionDto } from '../../models/dto/competition.dto';
import { map } from 'rxjs/operators';
import * as moment from 'moment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private http: HttpClient) { }

  public getList(): Observable<Competition[]> {
    return this.http.get<CompetitionDto[]>(`${environment.apiUrl}competition`).pipe(
      map(dtos => dtos.map(dto => Competition.fromDto(dto)))
    );
  }

  public getMy(): Observable<Competition[]> {
    return this.http.get<Competition[]>(`${environment.apiUrl}auth/me/competitions`, { withCredentials: true }).pipe(
      map(comps => comps.map(comp => {
        comp.startDate = moment.utc(comp.startDate, 'YYYY-MM-DD');
        comp.endDate = moment.utc(comp.endDate, 'YYYY-MM-DD');
        return comp
      }))
    );
  }

  public import(competitionId: string): Observable<Competition> {
    return this.http.post<CompetitionDto>(`${environment.apiUrl}auth/competition/${competitionId}`, null, { withCredentials: true }).pipe(
      map(dto => dto === null ? null : Competition.fromDto(dto))
    );
  }

  public getForId(id: string): Observable<Competition> {
    return this.http.get<CompetitionDto>(`${environment.apiUrl}competition/${id}`).pipe(
      map(dto => Competition.fromDto(dto))
    );
  }
}
