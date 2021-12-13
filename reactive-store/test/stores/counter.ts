import { configureStore, Reducer, Store, createReducer, ErrorReporter } from '../../src';

interface IncrementAction {
  type: 'INCREMENT'
}

interface DecrementAction {
  type: 'DECREMENT'
}

type Action = IncrementAction | DecrementAction;

const rootReducer: Reducer<number, Action> = createReducer((state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1;
    case 'DECREMENT':
      return state - 1;
    default:
      return state;
  }
});

type IncrementStore = Store<number, Action>;

export const configureCounterStore = (errorReporter: ErrorReporter): IncrementStore => configureStore({
  rootReducer,
  errorReporter,
});
