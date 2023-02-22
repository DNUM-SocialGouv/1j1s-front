import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import React from 'react';

import { Detail } from '../../client/components/features/Alternance/Detail/Detail';
import { Head } from '../../client/components/head/Head';
import { Alternance } from '../../server/alternances/domain/alternance';
import { PageContextParamsException } from '../../server/exceptions/pageContextParams.exception';
import { dependencies } from '../../server/start';

type ConsulterAnnonceAlternancePageProps = {
  annonce: Alternance;
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<ConsulterAnnonceAlternancePageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id } = context.params;
	const annonce = await dependencies.alternanceDependencies.consulterAlternance.handle(id);

	if (annonce.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			annonce: JSON.parse(JSON.stringify(annonce.result)),
		},
	};
}

export default function AnnonceAlternancePage({ annonce }: ConsulterAnnonceAlternancePageProps) {
	return (
		<>
			<Head
				title={`${annonce.titre} | 1jeune1solution`}
				robots="noindex"
			/>
			<Detail annonce={annonce} />
		</>
	);
}
