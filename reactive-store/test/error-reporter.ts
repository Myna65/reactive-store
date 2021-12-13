import { ErrorReporter, StoreError } from '../src';

export class InMemoryErrorReporter implements ErrorReporter {
  errors: StoreError[] = [];

  reportError(error: StoreError): void {
    this.errors.push(error);
  }
}
