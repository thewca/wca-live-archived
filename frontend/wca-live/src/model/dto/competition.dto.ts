import { EventDTO } from './event.dto';

export class CompetitionDTO {
  public id: string;
  public name: string;
  public startDate: string;
  public endDate: string;
  public events: EventDTO[];
}
