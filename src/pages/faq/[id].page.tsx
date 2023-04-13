import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { Head } from '~/client/components/head/Head';
import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';
import { Article } from '~/server/cms/domain/article';
import {
	Question,
	QuestionSlug,
} from '~/server/cms/domain/FAQ.type';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { dependencies } from '~/server/start';

type ConsulterFAQRéponsePageProps = {
	faqRéponse: Question.QuestionRéponse
	isFeatureActive: true
} | {
	faqRéponse?: never
	isFeatureActive: false
}

interface FAQRéponse extends ParsedUrlQuery {
	id: QuestionSlug
}

const faqRéponseMapToArticleFormat = (faqRéponse: Question.QuestionRéponse): Article => {
	return {
		contenu: faqRéponse.contenu,
		titre: faqRéponse.problématique,
	};
};

export default function ConsulterArticlePage({ faqRéponse, isFeatureActive  }: ConsulterFAQRéponsePageProps) {
	if (!isFeatureActive) return <ErrorUnavailableService/>;

	return (
		<>
			<Head
				title={`${faqRéponse.problématique} | 1jeune1solution`}
				robots="index,follow"
			/>
			<ConsulterArticle article={faqRéponseMapToArticleFormat(faqRéponse)} />
		</>
	);
}


export async function getStaticProps(context: GetStaticPropsContext<FAQRéponse>): Promise<GetStaticPropsResult<ConsulterFAQRéponsePageProps>> {
	const displayFaq = process.env.NEXT_PUBLIC_FAQ_FEATURE === '1';
	if (!displayFaq) return {
		props: {
			isFeatureActive: false,
		},
	};

	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const faqRéponse = await dependencies.cmsDependencies.consulterFAQ.handle(id);

	if (faqRéponse.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}
	const { result } = faqRéponse;

	return {
		props: {
			faqRéponse: removeUndefinedKeys(result),
			isFeatureActive: true,
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};

}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		fallback: true,
		paths: [],
	};
}
