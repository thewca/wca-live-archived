import { Model, StaticThis } from './model';
import { Round } from './round.model';
import { EventDto } from './dto/event.dto';

export class Event extends Model {
  public id: string;
  public rounds: Round[];

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: EventDto): T {
    const model = new this();
    model.id = dto.id;
    model.rounds = dto.rounds.map(r => Round.fromDto(r));
    return model;
  }
}
