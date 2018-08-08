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
    window.location.href = `${Constants.API_URL}auth/wca/login?redirect=${encodeURI(Constants.APP_URL)}`;
  }

  public logout() {
    window.location.href = `${Constants.API_URL}auth/wca/logout?redirect=${encodeURI(Constants.APP_URL)}`;
  }

  public me() {
    return this.http.get(`${Constants.API_URL}api/me`, { withCredentials: true });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.get(`${Constants.API_URL}api/me`, { withCredentials: true }).pipe(
      map((resp: any) => resp.id > 0),
      catchError(_ => obsOf(false))
    );
  }
}
