import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import process from 'process';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/apprentissage/[id].analytics';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';

import styles from './index.module.scss';

export type ConsulterAlternanceEntreprisePageProps = {
	id: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext<{ id: string }>): Promise<GetServerSidePropsResult<ConsulterAlternanceEntreprisePageProps>> {
	const featureActivée = process.env.NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE === '1';
	if (!featureActivée) {
		return { notFound: true };
	}

	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;

	return {
		props: {
			id: id,
		},
	};
}

const SOURCE_ENTREPRISE_POSTUlER_IFRAME = `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}postuler?caller=1jeune1solution&type=lba`;

export default function AnnonceAlternanceEntreprisePage({ id }: ConsulterAlternanceEntreprisePageProps) {
	useAnalytics(analytics);

	return (
		<>
			<Head
				title={'Candidature spontanée en alternance | 1jeune1solution'}
				robots="noindex"
			/>
			<ConsulterOffreLayout>
				<iframe
					src={`${SOURCE_ENTREPRISE_POSTUlER_IFRAME}&itemId=${id}`}
					className={styles.iframe}
					title="Formulaire de candidature spontanée en alternance"
				/>
			</ConsulterOffreLayout>
		</>
	);
}
