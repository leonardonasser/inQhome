import { ReplaySubject, concat, of, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class LoadingState<T> {
  loading: boolean;
  value: T;
  error: any;

  constructor(loading: boolean, value: T, error: any) {
    this.loading = loading;
    this.value = value;
    this.error = error;
  }

  static loading(): LoadingState<any> {
    return new LoadingState(true, null, null);
  }

  static complete(value: any): LoadingState<any> {
    return new LoadingState(false, value, null);
  }

  static error(error: any): LoadingState<any> {
    return new LoadingState(false, null, error);
  }
}

export default class LoadingSubject<T> {

  stream = new ReplaySubject<LoadingState<T>>();

  constructor() {
  }

  next(obs: Observable<T>) {
    concat(
        of(LoadingState.loading()),
        obs.pipe(map(value => LoadingState.complete(value)))
    )
    .subscribe(
      value => this.stream.next(value),
      err => this.stream.next(LoadingState.error(err))
    );
  }

  asObservable(): Observable<LoadingState<T>> {
    return this.stream.asObservable();
  }
}
