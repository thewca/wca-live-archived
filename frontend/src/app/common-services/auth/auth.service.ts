import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Observable } from 'rxjs';
import { of as obsOf } from 'rxjs'
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public login() {
    window.location.href = `${environment.apiUrl}auth/login?redirect=${encodeURI(environment.appUrl)}`;
  }

  public logout() {
    window.location.href = `${environment.apiUrl}auth/logout?redirect=${encodeURI(environment.appUrl)}`;
  }

  public me() {
    return this.http.get(`${environment.apiUrl}auth/me`, { withCredentials: true });
  }

  public isLoggedIn(): Observable<boolean> {
    return this.http.get(`${environment.apiUrl}auth/me`, { withCredentials: true }).pipe(
      map((resp: any) => resp.id > 0),
      catchError(_ => obsOf(false))
    );
  }
}
