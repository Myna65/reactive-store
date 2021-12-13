import { configureStore, createReducer, ErrorReporter, Reducer, Store } from '../../src';

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
      const newState = state - 1;
      if(newState < 0) {
        throw new Error('Counter should not be lower than 0');
      }
      return newState;
    default:
      return state;
  }
});

type IncrementStore = Store<number, Action>;

export const configureNonNegativeThrowCounterStore = (errorReporter: ErrorReporter): IncrementStore => configureStore({
  rootReducer,
  errorReporter,
});
