import { EventDTO } from './event.dto';

export class CompetitorDTO {
  public id: number;
  public wcaId: string;
  public name: string;
  public eventResults: EventDTO[];
}
