import { GetStaticPropsResult } from 'next';
import React from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useReferrer from '~/client/hooks/useReferrer';
import { FoireAuxQuestions } from '~/server/cms/domain/foireAuxQuestions.type';
import { dependencies } from '~/server/start';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/faq/index.analytics';

import styles from './index.page.module.scss';

type FaqPageProps = {
	faqList: Array<FoireAuxQuestions>
	isFeatureActive: true
} | {
	faqList?: never
	isFeatureActive: false
}

export default function FaqPage({ faqList, isFeatureActive }: FaqPageProps) {
	useAnalytics(analytics);
	useReferrer();

	if (!isFeatureActive) return <ErrorUnavailableService/>;

	return (
		<>
			<Head
				title="FAQ | 1jeune1solution"
				robots="index,follow"
			/>
			<main id="contenu">
				<Container className={styles.container}>
					<h1 className={styles.titre}>FAQ - QUESTIONS FRÉQUEMMENT POSÉES</h1>
					<h2 className={styles.sousTitre}>Que pouvons-nous faire pour vous ?</h2>
					{faqList?.length > 0 && <ul aria-label="Foire aux questions" className={styles.liste}>
						{faqList?.map((faq) => <li key={uuidv4()}>
							<Link href={`/faq/${faq.urlArticleRéponse}`}>
								<h3>{faq.problématique}</h3>
								<Icon name='angle-right'/>
							</Link>
						</li>) }
					</ul>
					}
				</Container>
			</main>
		</>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<FaqPageProps>> {
	const displayFaq = process.env.NEXT_PUBLIC_FAQ_FEATURE === '1';
	if (!displayFaq) return {
		props: {
			isFeatureActive: false,
		},
	};

	const faqList = await dependencies.cmsDependencies.listerQuestionsFAQ.handle();
	if (faqList.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			faqList: faqList.result,
			isFeatureActive: true,
		},
	};
}
