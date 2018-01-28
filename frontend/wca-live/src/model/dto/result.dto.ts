import { SolveTimeDto } from './solveTime.dto';
import { IBaseDto } from './iBaseDto';

export class ResultDto implements IBaseDto {
  public personId: number;
  public pos: number;
  public average: SolveTimeDto;
  public values: SolveTimeDto[];
  public noShow: boolean;
}
