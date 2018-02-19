import { EventDto } from './event.dto';
import { IBaseDto } from './iBaseDto';

export class CompetitionDto implements IBaseDto {
  public id: string;
  public name: string;
  public startDate?: string;
  public endDate?: string;
  public events?: EventDto[];
  public schedule?: {startDate: string, numberOfDays: number};
}
