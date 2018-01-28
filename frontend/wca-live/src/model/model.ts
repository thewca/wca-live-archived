import { IBaseDto } from './dto/iBaseDto';

export interface StaticThis<T> {
  new (): T;
}

export class Model {
  [key: string]: any;

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: IBaseDto): T {
    const model = new this();
    for (const prop in dto) {
      if (dto.hasOwnProperty(prop)) {
        model[prop] = dto[prop];
      }
    }
    return model;
  }

  public static hydrate<T extends Model>(this: StaticThis<T>, cached: any): T {
    const model = new this();
    for (const prop in cached) {
      if (cached.hasOwnProperty(prop)) {
        model[prop] = cached[prop];
      }
    }
    return model;
  }
}
