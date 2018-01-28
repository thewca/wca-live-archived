import { RoundDto } from './round.dto';
import { IBaseDto } from './iBaseDto';

export class EventDto implements IBaseDto {
  public id: string;
  public rounds: RoundDto[];
}
