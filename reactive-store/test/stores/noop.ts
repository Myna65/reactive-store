import { configureStore, Reducer, Store } from '../../src';

export type NoopStore = Store<{}, never>;

const rootReducer: Reducer<{}, never> = () => {
  return {};
}

export const configureNoopStore: () => NoopStore = () => configureStore({
  rootReducer,
});
