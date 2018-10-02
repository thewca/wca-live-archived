import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable()
export class PersonService {
  constructor(
    private readonly _http: HttpClient
  ) {}

  public getCompetitorsForRound(competitionId: string, eventRoundId: string): Observable<any[]> {
    return this._http.get<any[]>(`${environment.apiUrl}competition/${competitionId}/${eventRoundId}/competitors`);
  }

  public getForCompetition(competitionId: string): Observable<any[]> {
    return this._http.get<any[]>(`${environment.apiUrl}competition/${competitionId}/competitors`);
  }
}