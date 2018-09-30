import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Constants } from "../constants";

@Injectable()
export class PersonService {
  constructor(
    private readonly _http: HttpClient
  ) {}

  public getCompetitorsForRound(competitionId: string, eventRoundId: string): Observable<any[]> {
    return this._http.get<any[]>(`${Constants.API_URL}competition/${competitionId}/${eventRoundId}/competitors`);
  }

  public getForCompetition(competitionId: string): Observable<any[]> {
    return this._http.get<any[]>(`${Constants.API_URL}competition/${competitionId}/competitors`);
  }
}