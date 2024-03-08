import { GetServerSidePropsResult as NextGetServerSidePropsResult } from 'next';

import { Erreur } from '~/server/errors/erreur.types';

type ResultWithError<T> = T | {
	error: Erreur;
}

export type GetServerSidePropsResult<T> = NextGetServerSidePropsResult<ResultWithError<T>>
