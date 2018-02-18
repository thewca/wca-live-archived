import { IBaseDto } from './iBaseDto';

export class PersonDto implements IBaseDto {
  public id: number;
  public name: string;
  public email: string;
  public delegateStatus: string;
  public wcaId: string;
}
