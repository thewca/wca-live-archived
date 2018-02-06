import { Injectable } from '@angular/core';
import { Settings } from '../settings.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CompetitionDto } from '../../../model/dto/competition.dto';
import { map } from 'rxjs/operators/map';
import { Competition } from '../../../model/competition.model';

@Injectable()
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  public login() {
    window.open(`${Settings.apiBaseUrl}/login`);
  }

  public logout() {}

  public getMyCompetitions(): Observable<Competition[]> {
    return this.http.get<CompetitionDto[]>(`${Settings.apiBaseUrl}/api/me/competitions`).pipe(
      map(dtos => dtos.map(dto => Competition.fromDto(dto)))
    );
  }

}
