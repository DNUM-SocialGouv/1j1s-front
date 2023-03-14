import { GetStaticPropsResult } from 'next';
import React from 'react';

import { MesuresEmployeursComponent, MesuresEmployeursProps } from '~/client/components/features/MesuresEmployeurs/MesuresEmployeurs';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/mesures-employeurs/index.analytics';
import { dependencies } from '~/server/start';

export default function MesuresEmployeursPage(props: MesuresEmployeursProps) {
	useAnalytics(analytics);
	useReferrer();
	return (
		<MesuresEmployeursComponent {...props} />
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<MesuresEmployeursProps>> {
	const response = await dependencies.cmsDependencies.récupérerMesuresEmployeurs.handle();

	if (response.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			mesureEmployeurList: JSON.parse(JSON.stringify(response.result)),
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}

