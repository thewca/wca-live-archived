import { SolveTimeDTO } from './solveTime.dto';

export class ResultDTO {
  public personId: number;
  public pos: number;
  public average: SolveTimeDTO;
  public values: SolveTimeDTO[];
  public noShow: boolean;
}
