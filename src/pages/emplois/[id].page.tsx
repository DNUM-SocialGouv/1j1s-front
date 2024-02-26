import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreEmploi } from '~/client/components/features/OffreEmploi/Consulter/ConsulterOffreEmploi';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/emplois/[id].analytics';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { Offre, OffreId } from '~/server/offres/domain/offre';
import { dependencies } from '~/server/start';

interface ConsulterOffreEmploiPageProps {
  offreEmploi: Offre;
}

export default function ConsulterOffreEmploiPage({ offreEmploi }: ConsulterOffreEmploiPageProps) {
	useAnalytics(analytics);

	if (!offreEmploi) return null;

	return (
		<>
			<Head
				title={`${offreEmploi.intitulé} | 1jeune1solution`}
				robots="noindex"
			/>
			<ConsulterOffreEmploi offreEmploi={offreEmploi} />
		</>
	);
}

interface EmploiContext extends ParsedUrlQuery {
  id: OffreId;
}

type TypeToAddError<T> = T | {
	error: Erreur;
}

type MyGetServerSidePropsResult<T> = GetServerSidePropsResult<TypeToAddError<T>>;

export async function getServerSideProps(context: GetServerSidePropsContext<EmploiContext>): Promise<MyGetServerSidePropsResult<ConsulterOffreEmploiPageProps>> {
	const erreur = true;
	if (erreur) {
		// faire une fonction qui prend en paramètre une erreur métier et qui set le status code et return le props
		context.res.statusCode = 500;
		return {
			props: {
				error: ErreurMetier.SERVICE_INDISPONIBLE,
			},
		};
	}
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id } = context.params;
	const offreEmploi = await dependencies.offreEmploiDependencies.consulterOffreEmploi.handle(id.toUpperCase());

	if (offreEmploi.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			offreEmploi: JSON.parse(JSON.stringify(offreEmploi.result)),
		},
	};
}
