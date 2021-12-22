import { Observable } from 'rxjs';

export type Selector<S, T> = (state: Observable<S>) => Observable<T>;
