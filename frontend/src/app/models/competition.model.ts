import * as moment from 'moment';
import { CompetitionDto } from './dto/competition.dto';
import { Event } from './event.model';
import { Person } from './person.model';

export class Competition {
  public id: string;
  public name: string;
  public startDate: moment.Moment;
  public endDate: moment.Moment;
  public events?: Event[];
  public persons?: Person[];

  public static fromDto(dto: CompetitionDto): Competition {
    let m = new Competition();
    m.id = dto.id;
    m.name = dto.name;
    m.startDate = moment.utc(dto.schedule.startDate, 'YYYY-MM-DD');
    m.endDate = moment.utc(dto.schedule.startDate, 'YYYY-MM-DD').add(dto.schedule.numberOfDays - 1, 'd');
    if (dto.hasOwnProperty('events')) {
      m.events = dto.events.map(e => Event.fromDto(e));
    }
    if (dto.hasOwnProperty('persons')) {
      m.persons = dto.persons.map(p => Person.fromDto(p));
    }
    return m;
  }
}