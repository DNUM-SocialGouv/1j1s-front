import { AxiosError } from 'axios';
import {
	GetServerSidePropsContext,
	GetServerSidePropsResult,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { AnnonceDeLogementAttributesFromCMS } from '~/client/components/features/Logement/AnnonceDeLogement.type';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import indexServices from '~/client/services/index.service';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';

export default function ConsulterAnnonceLogementPage({ annonceDeLogement }: ConsulterAnnonceLogementPageProps) {
	return (
		<>
			<HeadTag title={`${annonceDeLogement.titre} | 1jeune1solution`} />
			<span>{annonceDeLogement.type} - {annonceDeLogement.typeBien}</span>
			<h1>{annonceDeLogement.titre}</h1>
		</>
	);
}

interface StageContext extends ParsedUrlQuery {
	id: string;
}

interface ConsulterAnnonceLogementPageProps {
	annonceDeLogement: AnnonceDeLogementAttributesFromCMS;
}

export async function getServerSideProps(context: GetServerSidePropsContext<StageContext>): Promise<GetServerSidePropsResult<ConsulterAnnonceLogementPageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}
	const { id: slug } = context.params;

	try {
		const annonceDeLogement = await indexServices.annonceDeLogement.get(slug);;
		return {
			props: {
				annonceDeLogement,
			},
		};
	} catch (e) {
		const error: AxiosError | Error = e as AxiosError | Error;
		if (error instanceof AxiosError && error.response?.status === 404) {
			return { notFound: true };
		}
		throw e;
	}
}
