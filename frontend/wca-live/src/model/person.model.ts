import { Model } from './model';

export class Person extends Model {
  public id: number;
  public name: string;
  public email: string;
  public delegateStatus: string;
  public wcaId: string;
}
