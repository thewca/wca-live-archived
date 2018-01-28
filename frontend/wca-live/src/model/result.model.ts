import { Model, StaticThis } from './model';
import { SolveTime } from './solveTime.model';
import { ResultDto } from './dto/result.dto';

export class Result extends Model {
  public personId: number;
  public pos: number;
  public average: SolveTime;
  public values: SolveTime[];
  public noShow: boolean;

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: ResultDto): T {
    const model = new this();
    model.personId = dto.personId;
    model.pos = dto.pos;
    model.average = SolveTime.fromDto(dto.average);
    model.values = dto.values.map(v => SolveTime.fromDto(v));
    model.noShow = dto.noShow;
    return model;
  }
}
