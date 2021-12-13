import { configureNoopStore } from './stores/noop';
import { configureCounterStore } from './stores/counter';
import { configureNonNegativeCounterStore } from './stores/counter-no-negative';
import { InMemoryErrorReporter } from './error-reporter';
import { ReducerError, Store } from '../src';
import { configureNonNegativeThrowCounterStore } from './stores/counter-no-negative-throw';
import { configureFailAtInitStore, configureFailAtInitStoreChecked } from './stores/fail-at-init';

describe('Reactive store', () => {
  let errorReporter: InMemoryErrorReporter;
  beforeEach(() => {
    errorReporter = new InMemoryErrorReporter();
  });

  describe('Store, reducers and state', () => {
    describe('Nominal cases', () => {
      test('A basic store should work', () => {
        const noopStore = configureNoopStore(errorReporter);
        expect(noopStore.getCurrentState()).toEqual({});
      });

      describe('A counter store should work', () => {
        test('Initial state should be 0', () => {
          const store = configureCounterStore(errorReporter);
          expect(store.getCurrentState()).toEqual(0);
        });

        test('After 1 increment, it should be 1', () => {
          const store = configureCounterStore(errorReporter);
          store.dispatch({ type: 'INCREMENT' });
          expect(store.getCurrentState()).toEqual(1);
        });

        test('After 2 increments, it should be 2', () => {
          const store = configureCounterStore(errorReporter);
          store.dispatch({ type: 'INCREMENT' });
          store.dispatch({ type: 'INCREMENT' });
          expect(store.getCurrentState()).toEqual(2);
        });

        test('After 1 increment and 1 decrement, it should be 0', () => {
          const store = configureCounterStore(errorReporter);
          store.dispatch({ type: 'INCREMENT' });
          store.dispatch({ type: 'DECREMENT' });
          expect(store.getCurrentState()).toEqual(0);
        });
      });
    });

    describe('When there is an error in a reducer', () => {
      const expectCounterShouldNoGoBellow0 = (store: Store<number, unknown>) => {
        expect(store.getCurrentState()).toEqual(0);
        expect(errorReporter.errors).toHaveLength(1);
        expect(errorReporter.errors[0]).toBeInstanceOf(ReducerError);
        expect(errorReporter.errors[0].cause.message).toEqual('Counter should not be lower than 0');
      };

      describe('At runtime', () => {
        describe('With a counter store that should never go below 0', () => {
          test('It should not be able to go below 0', () => {
            const store = configureNonNegativeCounterStore(errorReporter);
            store.dispatch({ type: 'DECREMENT' });
            expectCounterShouldNoGoBellow0(store);
          });
        });
      });

      describe('At runtime when throwing', () => {
        describe('With a counter store that should never go below 0', () => {
          test('It should not be able to go below 0', () => {
            const store = configureNonNegativeThrowCounterStore(errorReporter);
            store.dispatch({ type: 'DECREMENT' });
            expectCounterShouldNoGoBellow0(store);
          });
        });
      });

      describe('At initial reducer call', () => {
        test('When using the checked version, it should be left', () => {
          const result = configureFailAtInitStoreChecked(errorReporter);
          expect(result.isLeft()).toEqual(true);
          result.mapLeft((e) => {
            expect(e.type).toEqual('INITIAL_REDUCTION_FAILED');
            expect(e.cause.cause.message).toEqual('init error');
          });
        });

        test('When using the unchecked version, it should throw', () => {
          expect(() => {
            configureFailAtInitStore(errorReporter);
          }).toThrow();
        });
      });
    });
  });
});
