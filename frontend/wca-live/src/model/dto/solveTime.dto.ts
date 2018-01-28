import { IBaseDto } from './iBaseDto';

export class SolveTimeDto implements IBaseDto {
  public centiseconds: number;
  public moveCount: number;
  public puzzlesSolved: number;
  public puzzlesAttempted: number;
}
