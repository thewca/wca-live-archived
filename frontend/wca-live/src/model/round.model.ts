import { Model, StaticThis } from './model';
import { Result } from './result.model';
import { RoundDto } from './dto/round.dto';

export class Round extends Model {
  public number: number;
  public results: Result[];

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: RoundDto) {
    const model = new this();
    model.number = dto.number;
    model.results = dto.results.map(r => Result.fromDto(r));
    return model;
  }
}
