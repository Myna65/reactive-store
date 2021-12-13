import { configureStore, Reducer, Store, createReducer, ErrorReporter } from '../../src';

export type NoopStore = Store<{}, never>;

const rootReducer: Reducer<{}, never> = createReducer(() => {
  return {};
});

export const configureNoopStore = (errorReporter: ErrorReporter): NoopStore => configureStore({
  rootReducer,
  errorReporter,
});
