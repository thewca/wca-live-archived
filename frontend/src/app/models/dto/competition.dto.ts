import { EventDto } from "./event.dto";
import { PersonDto } from "./person.dto";

export class CompetitionDto {
  public id: string;
  public name: string;
  public startDate: string;
  public endDate: string;
  public events?: EventDto[];
  public persons?: PersonDto[];
}
