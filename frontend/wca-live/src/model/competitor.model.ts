import { Model, StaticThis } from './model';
import { Event } from './event.model';
import { CompetitorDto } from './dto/competitor.dto';

export class Competitor extends Model {
  public id: number;
  public wcaId: string;
  public name: string;
  public results: Event[];

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: CompetitorDto): T {
    const model = new this();
    model.id = dto.id;
    model.wcaId = dto.wcaId;
    model.name = dto.name;
    model.results = dto.eventResults.map(e => Event.fromDto(e));
    return model;
  }
}
