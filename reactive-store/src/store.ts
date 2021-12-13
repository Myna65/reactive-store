import { BehaviorSubject, Observable } from 'rxjs';
import { Either } from 'purify-ts';
import { ErrorReporter, ReducerError } from './error';
import { Reducer } from './reducer';
import { InitAction } from './action';

export interface Store<State, Action> {
  dispatch(action: Action): void;
  getCurrentState(): State;
  getObservableState(): Observable<State>;
}

interface StoreConfig<State, Action> {
  rootReducer: Reducer<State, Action>;
  errorReporter: ErrorReporter;
}

export class StoreCreationError extends Error {
  constructor(public readonly cause: ReducerError) {
    super();
  }
  readonly type = 'INITIAL_REDUCTION_FAILED';
}

export const configureStoreChecked = <State, Action>({
  rootReducer,
  errorReporter,
}: StoreConfig<State, Action>): Either<StoreCreationError, Store<State, Action>> => {
  const initialReductionResult = rootReducer(undefined, InitAction);

  return initialReductionResult.bimap(
    (error: ReducerError) => new StoreCreationError(error),
    (initialReduction) => {
      const state = new BehaviorSubject<State>(initialReduction);

      return {
        dispatch(action: Action) {
          const newReductionResult = rootReducer(state.getValue(), action);

          newReductionResult.bimap(
            (error) => {
              errorReporter.reportError(error);
            },
            (reducedState) => {
              state.next(reducedState);
            },
          );
        },
        getCurrentState(): State {
          return state.getValue();
        },
        getObservableState(): Observable<State> {
          return state;
        },
      };
    },
  );
};

export const configureStore = <State, Action>(config: StoreConfig<State, Action>): Store<State, Action> => {
  return configureStoreChecked(config).caseOf({
    Left: (error) => {
      throw error;
    },
    Right: (store) => store,
  });
};
