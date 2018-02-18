import { Observable } from 'rxjs/Observable';
import { Model } from '../model/model';

export const sortByProp = <T extends Model>(prop: string) =>
  (source: Observable<T[]>) => new Observable<T[]>(observer => source.subscribe({
    next(x: T[]) {
      x.sort((a, b) => {
        if (a[prop] < b[prop]) {
          return -1;
        }
        if (a[prop] > b[prop]) {
          return 1;
        }
        return 0;
      });
      observer.next(x);
    },
    error(err) { observer.error(err); },
    complete() { observer.complete(); }
  })
);
