import { ErrorType } from '~/server/errors/error.types';

export type Failure = { instance: 'failure', errorType: ErrorType };
export type Success<T> = { instance: 'success', result: T };
export type Either<T> = Success<T> | Failure;

export const createFailure = (errorType: ErrorType): Failure => ({ errorType, instance: 'failure' });
export const createSuccess = <T>(result: T): Success<T> => ({ instance: 'success', result });
