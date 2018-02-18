import { Injectable } from '@angular/core';
import { Settings } from '../settings.service';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { CompetitionDto } from '../../../model/dto/competition.dto';
import { map } from 'rxjs/operators/map';
import { Competition } from '../../../model/competition.model';
import { PersonDto } from '../../../model/dto/person.dto';
import { Person } from '../../../model/person.model';

@Injectable()
export class AuthService {

  private _loggedIn = false;
  private _loggedInUser: Person | null = null;

  public get loggedIn() {
    return this._loggedIn;
  }

  public get loggedInUser() {
    return this._loggedInUser;
  }

  constructor(
    private http: HttpClient
  ) { }

  public login() {
    const url = `${Settings.apiBaseUrl}/auth/wca/login?redirect=${window.location.href}`;
    window.location.href = url;
  }

  public logout() {
    const url = `${Settings.apiBaseUrl}/auth/wca/logout`;
    this.http.get(url);
    this._loggedIn = false;
  }

  public checkLoginStatus() {
    const url = `${Settings.apiBaseUrl}/api/me`;
    this.http.get<PersonDto>(url, { observe: 'response', withCredentials: true }).subscribe(response => {
      if (response.status === 200 && response.body !== null) {
        this._loggedIn = true;
        this._loggedInUser = Person.fromDto(response.body);
      } else {
        this._loggedIn = false;
        this._loggedInUser = null;
      }
    });
  }

  public getMyCompetitions(): Observable<Competition[]> {
    return this.http.get<CompetitionDto[]>(`${Settings.apiBaseUrl}/api/me/competitions`).pipe(
      map(dtos => dtos.map(dto => Competition.fromDto(dto)))
    );
  }

}
