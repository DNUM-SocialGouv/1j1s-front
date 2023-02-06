import { Erreur } from '~/server/errors/erreur.types';

export type Either<T> = Success<T> | Failure;

export interface Failure {
	instance: 'failure';
	errorType: Erreur;
}

export interface Success<T> {
	instance: 'success';
	result: T;
}

export function isSuccess<T>(e: Either<T>): e is Success<T> {
	return e.instance === 'success';
}

export function isFailure<T>(e: Either<T>): e is Failure {
	return e.instance === 'failure';
}

export function createFailure(errorType: Erreur): Failure {
	return {
		errorType,
		instance: 'failure',
	};
}

export function createSuccess<T>(result: T): Success<T> {
	return {
		instance: 'success',
		result,
	};
}
