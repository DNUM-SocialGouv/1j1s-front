import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import {
	DetailEmploiEurope,
} from '~/client/components/features/EmploisEurope/ConsulterOffre/ConsulterOffreEmploiEurope';
import { Head } from '~/client/components/head/Head';
import useAnalytics from '~/client/hooks/useAnalytics';
import { EmploiEurope } from '~/server/emplois-europe/domain/emploiEurope';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { dependencies } from '~/server/start';

import analyticsPageConfig from './[id].analytics';

interface ConsulterAnnonceEmploiEuropePageProps {
	annonceEmploiEurope: EmploiEurope
}
export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<ConsulterAnnonceEmploiEuropePageProps>> {
	const featureActivee = process.env.NEXT_PUBLIC_EMPLOIS_EUROPE_FEATURE === '1';
	if (!featureActivee) {
		return { notFound: true };
	}

	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const emploiEuropeResponse = await dependencies.emploiEuropeDependencies.consulterEmploiEuropeUseCase.handle(id);

	if (emploiEuropeResponse.instance === 'failure') {
		return { notFound: true };
	}
	return {
		props: {
			annonceEmploiEurope: removeUndefinedKeys(emploiEuropeResponse.result),
		},
	};
}

export default function ConsulterEmploiEurope({ annonceEmploiEurope }: ConsulterAnnonceEmploiEuropePageProps) {
	useAnalytics(analyticsPageConfig);

	return (
		<>
			<Head
				title={`${annonceEmploiEurope.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<DetailEmploiEurope annonceEmploiEurope={annonceEmploiEurope}/>
		</>
	);
}
