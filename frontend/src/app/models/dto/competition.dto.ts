import { EventDto } from "./event.dto";
import { PersonDto } from "./person.dto";

export class CompetitionDto {
  public id: string;
  public name: string;
  public schedule: { startDate: string, numberOfDays: number };
  public events?: EventDto[];
  public persons?: PersonDto[];
}
