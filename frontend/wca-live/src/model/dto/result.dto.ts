import { SolveTimeDto } from './solveTime.dto';

export class ResultDto {
  public personId: number;
  public pos: number;
  public average: SolveTimeDto;
  public values: SolveTimeDto[];
  public noShow: boolean;
}
