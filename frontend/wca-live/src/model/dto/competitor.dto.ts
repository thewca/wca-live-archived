import { EventDto } from './event.dto';

export class CompetitorDto {
  public id: number;
  public wcaId: string;
  public name: string;
  public eventResults: EventDto[];
}
