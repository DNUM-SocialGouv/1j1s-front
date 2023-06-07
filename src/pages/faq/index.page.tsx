import { GetStaticPropsResult } from 'next';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import analytics from '~/pages/faq/index.analytics';
import styles from '~/pages/faq/index.module.scss';
import { Question } from '~/server/cms/domain/FAQ.type';
import { dependencies } from '~/server/start';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';

type FaqPageProps = {
	listeDeQuestionRéponse: Array<Question>
	isFeatureActive: true
} | {
	listeDeQuestionRéponse?: never
	isFeatureActive: false
}
const MAIL_TO = 'contact-1j1s@sg.social.gouv.fr';

export default function FaqPage({ listeDeQuestionRéponse, isFeatureActive }: FaqPageProps) {
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
					{listeDeQuestionRéponse?.length > 0 && <ul aria-label="Foire aux questions" className={styles.liste}>
						{listeDeQuestionRéponse?.map((question) => <li key={question.slug}>
							<Link href={`/faq/${question.slug}`}>
								<h3>{question.problématique}</h3>
								<Icon name='angle-right'/>
							</Link>
						</li>) }
					</ul>
					}
					<div className={styles.contact}>
						<h3>Vous ne trouvez pas de réponse à votre question ?</h3>
						<LinkStyledAsButton appearance={'asSecondaryButton'} href={`mailto:${MAIL_TO}`} prefetch={false} className={styles.linkContact}>
							Nous contacter
						</LinkStyledAsButton>
					</div>
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

	const listeDeQuestionRéponse = await dependencies.cmsDependencies.listerQuestionsFAQ.handle();
	if (listeDeQuestionRéponse.instance === 'failure') {
		return { notFound: true };
	}

	return {
		props: {
			isFeatureActive: true,
			listeDeQuestionRéponse: listeDeQuestionRéponse.result,
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}
