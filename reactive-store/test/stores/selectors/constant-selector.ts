import { Selector } from '../../../src/selector';
import { map } from 'rxjs';

export const constantSelector: Selector<any, null> = (state) => {
  return state.pipe(map(() => null));
};
