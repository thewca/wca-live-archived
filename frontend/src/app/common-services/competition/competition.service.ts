import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../constants';
import { Observable } from 'rxjs';
import { Competition } from '../../models/competition.model';
import { CompetitionDto } from '../../models/dto/competition.dto';
import { map } from 'rxjs/operators';

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

  public getForId(id: string): Observable<Competition> {
    return this.http.get<CompetitionDto>(`${Constants.API_URL}api/competitions/${id}`).pipe(
      map(dto => Competition.fromDto(dto))
    );
  }
}
