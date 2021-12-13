import { configureStore, Reducer, Store } from '../src';

describe('Reactive store', () => {
  let noopStore: Store<{ }, never>;

  beforeEach(() => {
    const rootReducer: Reducer<{}, never> = () => {
      return {};
    }

    return configureStore({
      rootReducer,
    });
  })

  beforeEach(() => {
    const rootReducer: Reducer<{}, never> = () => {
      return {};
    }

    return configureStore({
      rootReducer,
    });
  })

  const incrementStore = (() => {
    interface IncrementAction {
      type: 'INCREMENT'
    }

    const rootReducer: Reducer<number, IncrementAction> = (state = 0, action) => {
      switch (action.type) {
        case 'INCREMENT':
          return state + 1;
        default:
          return state;
      }
    }

    return configureStore({
      rootReducer,
    });
  })();

  test('A basic store should work', () => {
    expect(noopStore.getCurrentState()).toEqual({});
  });

  describe('A counter store should work', () => {
    test('Initial state should be 0', () => {
      expect(incrementStore.getCurrentState()).toEqual(0);
    });

    test('After 1 increment, it should be 1', () => {
      incrementStore.dispatch({type: 'INCREMENT'});
      expect(incrementStore.getCurrentState()).toEqual(1);
    });

    test('After 2 increments, it should be 2', () => {
      incrementStore.dispatch({type: 'INCREMENT'});
      incrementStore.dispatch({type: 'INCREMENT'});
      expect(incrementStore.getCurrentState()).toEqual(1);
    })



  });


  describe('Selectors', () => {

  })
})
