import { ErreurMétier } from '~/server/errors/erreurMétier.types';

export type Failure = { instance: 'failure', errorType: ErreurMétier };
export type Success<T> = { instance: 'success', result: T };
export type Either<T> = Success<T> | Failure;

export const createFailure = (errorType: ErreurMétier): Failure => ({ errorType, instance: 'failure' });
export const createSuccess = <T>(result: T): Success<T> => ({ instance: 'success', result });
