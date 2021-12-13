import { configureStore, Reducer, ReducerError, Store } from '../../src';
import { Left, Right } from 'purify-ts';

interface IncrementAction {
  type: 'INCREMENT'
}

interface DecrementAction {
  type: 'DECREMENT'
}

type Action = IncrementAction | DecrementAction;

const rootReducer: Reducer<number, Action> = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return Right(state + 1);
    case 'DECREMENT':
      const newState = state - 1;
      if(newState < 0) {
        return Left(new ReducerError('counter should not be lower than 0'));
      }
      return Right(newState);
    default:
      return Right(state);
  }
};

type IncrementStore = Store<number, Action>;

export const configureNonNegativeCounterStore: () => IncrementStore = () => configureStore({
  rootReducer,
});
