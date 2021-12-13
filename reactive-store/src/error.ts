export type StoreError = ReducerError;

export class ReducerError {
  cause: Error;

  constructor(p: Error | string) {
    if (typeof p === 'string') {
      this.cause = new Error(p);
    } else {
      this.cause = p;
    }
  }
}

export interface ErrorReporter {
  reportError(error: StoreError): void;
}
