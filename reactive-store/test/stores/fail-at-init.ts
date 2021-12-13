import { configureStore, configureStoreChecked, ErrorReporter, Reducer, ReducerError, Store } from '../../src';
import { Left } from 'purify-ts';

type Action = never;

const rootReducer: Reducer<{}, Action> = () => {
  return Left(new ReducerError('init error'));
};

type IncrementStore = Store<{}, Action>;

export const configureFailAtInitStore = (errorReporter: ErrorReporter): IncrementStore => configureStore({
  rootReducer,
  errorReporter,
});

export const configureFailAtInitStoreChecked = (errorReporter: ErrorReporter) => configureStoreChecked({
  rootReducer,
  errorReporter,
});
