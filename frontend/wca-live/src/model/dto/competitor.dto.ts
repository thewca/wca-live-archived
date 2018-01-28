import { EventDto } from './event.dto';
import { IBaseDto } from './iBaseDto';

export class CompetitorDto implements IBaseDto {
  public id: number;
  public wcaId: string;
  public name: string;
  public eventResults: EventDto[];
}
