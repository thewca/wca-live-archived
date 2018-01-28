import { ResultDto } from './result.dto';
import { IBaseDto } from './iBaseDto';

export class RoundDto implements IBaseDto {
  public number: number;
  public results: ResultDto[];
}
