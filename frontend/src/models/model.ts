export interface StaticThis<T> {
  new(): T;
}

export abstract class Model {
  [key: string]: any;

  public static fromDto<T extends Model>(this: StaticThis<T>, dto: {[key: string]: any}): T {
    let m = new this();
    for(let p in dto) {
      if (dto.hasOwnProperty(p)) {
        m[p] = dto[p];
      }
    }
    return m;
  }

  public static fromCache<T extends Model>(this: StaticThis<T>, cached: {[key: string]: any}): T {
    let m = new this();
    for (let p in cached) {
      if (cached.hasOwnProperty(p)) {
        m[p] = cached[p];
      }
    }
    return m;
  }

  public toDto(): {[key: string]: any} {
    let dto: {[key: string]: any} = {};
    for (let p in this) {
      if (this.hasOwnProperty(p)) {
        dto[p] = this[p];
      }
    }
    return dto;
  }
}
