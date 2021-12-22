import { Selector } from '../src/selector';
import { Store } from '../src';

export const expectSelectorToBeSubscribed = <S, A, T>(
  store: Store<S, A>,
  selector: Selector<S, T>,
  callback: (value: T) => void,
) => {
  const selectedData = selector(store.getObservableState());
  let called = false;
  selectedData.subscribe((value: T) => {
    called = true;
    callback(value);
  });
  expect(called).toBe(true);
};
