import * as moment from 'moment';
import { CompetitionDto } from './dto/competition.dto';

export class Competition {
  public id: string;
  public name: string;
  public startDate: moment.Moment;
  public endDate: moment.Moment;

  public static fromDto(dto: CompetitionDto): Competition {
    let m = new Competition();
    m.id = dto.id;
    m.name = dto.name;
    m.startDate = moment.utc(dto.schedule.startDate, 'YYYY-MM-DD');
    m.endDate = moment.utc(dto.schedule.startDate, 'YYYY-MM-DD').add(dto.schedule.numberOfDays - 1, 'd');
    return m;
  }
}