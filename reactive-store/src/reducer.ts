import { Either, Left, Right } from 'purify-ts';
import { ReducerError } from './error';
import { WithInternalActions } from './action';

export type UncheckedReducer<State, Action> = (state: State | undefined, action: WithInternalActions<Action>) => State;
export type Reducer<State, Action> = (
  state: State | undefined,
  action: WithInternalActions<Action>,
) => Either<ReducerError, State>;

export const createReducer = <State, Action>(reducer: UncheckedReducer<State, Action>): Reducer<State, Action> => {
  return (state: State | undefined, action) => {
    try {
      return Right(reducer(state, action));
    } catch (e: unknown) {
      if (e instanceof Error) {
        return Left(new ReducerError(e));
      } else {
        throw e;
      }
    }
  };
};
