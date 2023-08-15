import { Observable } from 'rxjs';

export const extractObservable = <T>(observable: Observable<T>): Promise<T> =>
  new Promise<T>((res, rej) =>
    observable.subscribe({
      next: res,
      error: rej,
    }),
  );
