import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { tap } from "rxjs/operators";
import { environment } from "../../../environments/environment";

@Injectable()
export class ResultService {
  private running: { [url: string]: Observable<any> } = {};
  private _resultsPerRegistrant: { [key: string]: any[] } = {};
  private _resultsPerRound: { [key: string]: any[] } = {};

  constructor(private readonly _http: HttpClient) {}

  public getForCompetitor(competitionId: string, registrantId: number, skipCache = false): Observable<any[]> {
    let key = competitionId + '-' + registrantId;
    if (this._resultsPerRegistrant.hasOwnProperty(key) && !skipCache) {
      return of(this._resultsPerRegistrant[key]);
    }
    let url = `${environment.apiUrl}competition/${competitionId}/competitors/${registrantId}/results`;
    if (this.running.hasOwnProperty(url)) {
      return this.running[url];
    }
    let o = this._http.get<any[]>(url).pipe(
      tap(results => {
        delete this.running[url];
        this._resultsPerRegistrant[key] = results;
      })
    );
    this.running[url] = o;
    return o;
  }

  public getForRound(competitionId: string, eventRoundId: string, skipCache = false): Observable<any[]> {
    let key = competitionId + '-' + eventRoundId;
    if (this._resultsPerRound.hasOwnProperty(key)) {
      return of(this._resultsPerRound[key]);
    }
    let url = `${environment.apiUrl}competition/${competitionId}/${eventRoundId}/results`;
    if (this.running.hasOwnProperty(url)) {
      return this.running[url];
    }
    let o = this._http.get<any[]>(url).pipe(
      tap(results => {
        delete this.running[url];
        this._resultsPerRound[key] = results;
      })
    );
    this.running[url] = o;
    return o;
  }
}