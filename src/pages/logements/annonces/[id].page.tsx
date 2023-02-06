import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterAnnonce } from '~/client/components/features/Logement/Consulter/ConsulterAnnonce';
import { HeadTag } from '~/client/components/head/HeaderTag';
import { MetaNoIndex } from '~/client/components/head/MetaNoIndex.head';
import { usePopstate } from '~/client/hooks/usePopstate';
import { AnnonceDeLogement } from '~/server/cms/domain/annonceDeLogement.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

export default function ConsulterAnnonceLogementPage({ annonceDeLogement }: ConsulterAnnonceLogementPageProps) {
	usePopstate();
	return (
		<>
			<HeadTag title={`${annonceDeLogement.titre} | 1jeune1solution`} />
			<MetaNoIndex />
			<ConsulterAnnonce annonceDeLogement={annonceDeLogement}/>
		</>
	);
}

interface LogementContext extends ParsedUrlQuery {
	id: string;
}

interface ConsulterAnnonceLogementPageProps {
	annonceDeLogement: AnnonceDeLogement;
}

export async function getServerSideProps(context: GetServerSidePropsContext<LogementContext>): Promise<GetServerSidePropsResult<ConsulterAnnonceLogementPageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id: slug } = context.params;

	const annonceDeLogement = await dependencies.cmsIndexDependencies.consulterAnnonceLogement.handle(`${slug}`);
	if (annonceDeLogement.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			annonceDeLogement: JSON.parse(JSON.stringify(annonceDeLogement.result)),
		},
	};
}
