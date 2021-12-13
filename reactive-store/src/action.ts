export const InitAction = {
  type: '@@INIT',
};

export type WithInternalActions<T> = T | typeof InitAction;
