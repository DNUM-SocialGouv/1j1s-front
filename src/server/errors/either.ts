import { Erreur } from '~/server/errors/erreur.types';

export type Either<T> = Success<T> | Failure;
export type Failure = { instance: 'failure', errorType: Erreur };
export type Success<T> = { instance: 'success', result: T };

export function isSuccess<T> (e: Either<T>): e is Success<T> {
	return e.instance === 'success';
}

export function isFailure<T> (e: Either<T>): e is Failure {
	return e.instance === 'failure';
}




export const createFailure = (errorType: Erreur): Failure => ({ errorType, instance: 'failure' });
export const createSuccess = <T>(result: T): Success<T> => ({ instance: 'success', result });
