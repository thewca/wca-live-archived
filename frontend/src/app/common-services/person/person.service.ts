import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Person } from "../../models/person.model";
import { CompetitionService } from "../competition/competition.service";
import { Observable } from "rxjs";
import { pluck, map } from "rxjs/operators";
import { ValidEventId } from "../../models/eventId.class";

@Injectable()
export class PersonService {
  constructor(
    private readonly _http: HttpClient,
    private readonly _competitionService: CompetitionService
  ) {}

  public getCompetitors(competitionId: string, eventId: ValidEventId): Observable<Person[]> {
    return this._competitionService.getForId(competitionId).pipe(
      pluck('persons'),
      map((persons: Person[]) => persons.filter(person => person.registration.eventIds.map(e => e.value).indexOf(eventId) > -1))
    );
  }
}