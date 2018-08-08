import { Injectable } from '@angular/core';
import { Constants } from '../constants';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { of as obsOf } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login() {
    window.location.href = `${Constants.API_URL}auth/wca/login?redirect=${encodeURI('http://localhost:4200/')}`;
  }

  public logout() {
    window.location.href = `${Constants.API_URL}auth/wca/logout`;
  }

  public me() {
    return this.http.get(`${Constants.API_URL}api/me`);
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.get(`${Constants.API_URL}api/me`).pipe(
      map((resp: any) => resp.id > 0),
      catchError(_ => obsOf(false))
    );
  }
}
