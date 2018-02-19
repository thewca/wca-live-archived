import { Model, StaticThis } from './model';
import * as moment from 'moment';
import { Event } from './event.model';
import { CompetitionDto } from './dto/competition.dto';

export class Competition extends Model {
  public id: string;
  public name: string;
  public startDate: moment.Moment;
  public endDate: moment.Moment;
  public events: Event[];

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: CompetitionDto): T {
    let startDate, endDate;
    if (dto.schedule) {
      startDate = moment(dto.schedule.startDate);
      endDate = startDate.clone().add(dto.schedule.numberOfDays - 1, 'd');
    }
    if (dto.startDate) {
      startDate = moment(dto.startDate);
    }
    if (dto.endDate) {
      endDate = moment(dto.endDate);
    }
    const model = new this();
    model.id = dto.id;
    model.name = dto.name;
    model.startDate = startDate;
    model.endDate = endDate;
    model.events = dto.events ? dto.events.map(e => Event.fromDto(e)) : [];
    return model;
  }

  public static hydrate<T extends Model>(this: StaticThis<T>, cached: any): T {
    const model = <T> cached;
    model.startDate = moment(cached.startDate);
    model.endDate = moment(cached.endDate);
    return model;
  }
}
