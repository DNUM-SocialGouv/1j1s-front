import { GetServerSidePropsContext, GetServerSidePropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterOffreDeStage } from '~/client/components/features/OffreDeStage/Consulter/ConsulterOffreDeStage';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { usePopstate } from '~/client/hooks/usePopstate';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterStagePageProps {
	offreDeStage: OffreDeStage;
}

export default function ConsulterOffreStagePage({ offreDeStage } : ConsulterStagePageProps) {
	usePopstate();

	return (
		<>
			<HeadTag title={`${offreDeStage.titre} | 1jeune1solution`} />
			<ConsulterOffreDeStage offreDeStage={offreDeStage}/>
		</>
	);
}

interface StageContext extends ParsedUrlQuery {
  id: string;
}

export async function getServerSideProps(context: GetServerSidePropsContext<StageContext>): Promise<GetServerSidePropsResult<ConsulterStagePageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id: slug } = context.params;

	const offreDeStage = await dependencies.cmsIndexDependencies.consulterOffreStage.handle(slug);

	if (offreDeStage.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			offreDeStage: JSON.parse(JSON.stringify(offreDeStage.result)),
		},
	};
}
