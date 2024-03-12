import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { Head } from '~/client/components/head/Head';
import { Article } from '~/server/articles/domain/article';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import {
	FAQ,
} from '~/server/faq/domain/FAQ';
import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';
import { dependencies } from '~/server/start';

type ConsulterFAQRéponsePageProps = {
	faqRéponse: FAQ.QuestionEtReponse
}

interface FAQRéponse extends ParsedUrlQuery {
	id: FAQ.Slug
}

const faqRéponseMapToArticleFormat = (faqRéponse: FAQ.QuestionEtReponse): Article => {
	return {
		contenu: faqRéponse.contenu,
		titre: faqRéponse.problématique,
	};
};

export default function ConsulterArticlePage({ faqRéponse  }: ConsulterFAQRéponsePageProps) {
	if (!faqRéponse) return null;

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
	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const faqRéponse = await dependencies.faqDependencies.consulterFAQ.handle(id);

	if (faqRéponse.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}
	const { result } = faqRéponse;

	return {
		props: {
			faqRéponse: removeUndefinedKeys(result),
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
