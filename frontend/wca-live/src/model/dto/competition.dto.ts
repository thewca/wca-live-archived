import { EventDto } from './event.dto';

export class CompetitionDto {
  public id: string;
  public name: string;
  public startDate: string;
  public endDate: string;
  public events: EventDto[];
}
