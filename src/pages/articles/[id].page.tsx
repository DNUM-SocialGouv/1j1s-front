import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';

import { ConsulterArticle } from '~/client/components/features/Article/ConsulterArticle';
import { Head } from '~/client/components/head/Head';
import { Article, ArticleSlug } from '~/server/cms/domain/article';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { dependencies } from '~/server/start';

interface ConsulterArticlePageProps {
	article: Article
}

export default function ConsulterArticlePage({ article }: ConsulterArticlePageProps) {
	if (!article) return null;

	return (
		<>
			<Head
				title={`${article.titre} | 1jeune1solution`}
				robots="index,follow"
			/>
			<ConsulterArticle article={article} />
		</>
	);
}

interface ArticleContext extends ParsedUrlQuery {
  id: ArticleSlug
}

export async function getStaticProps(context: GetStaticPropsContext<ArticleContext>): Promise<GetStaticPropsResult<ConsulterArticlePageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const response = await dependencies.cmsDependencies.consulterArticle.handle(id);

	if (response.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			article: JSON.parse(JSON.stringify(response.result)),
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
