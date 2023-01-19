import { GetStaticPathsResult, GetStaticPropsContext, GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import { ParsedUrlQuery } from 'querystring';
import React, { useEffect } from 'react';

import { ButtonRetour } from '~/client/components/features/ButtonRetour/ButtonRetour';
import { ConsulterFicheMétier } from '~/client/components/features/FicheMétier/Consulter/ConsulterFicheMétier';
import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import { Container } from '~/client/components/layouts/Container/Container';
import { EnTeteSection } from '~/client/components/ui/EnTeteSection/EnTeteSection';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import { PageContextParamsException } from '~/server/exceptions/pageContextParams.exception';
import { FicheMétier } from '~/server/fiche-metier/domain/ficheMetier';
import { dependencies } from '~/server/start';

import styles from './decouvrir-les-metiers.module.scss';

interface ConsulterFicheMetierPageProps {
	ficheMetier: FicheMétier
}

export default function ConsulterFicheMetierPage({ ficheMetier }: ConsulterFicheMetierPageProps) {
	const router = useRouter();

	useEffect(() => {
		window.addEventListener('popstate', () => router.reload());
		return () => window.removeEventListener('popstate', () => router.reload());
	}, [router]);

	if (!ficheMetier) return null;

	return (
		<>
			<HeadTag
				title={`${ficheMetier.nomMetier.charAt(0).toUpperCase()}${ficheMetier.nomMetier.slice(1)} | 1jeune1solution`}/>
			<main id="contenu">
				<Container className={styles.container}>
					<ButtonRetour className={styles.backButton}/>
					<ConsulterFicheMétier ficheMetier={ficheMetier}/>
				</Container>
				<div className={'background-white-lilac'}>
					<EnTeteSection heading="Informations fournies par ONISEP"/>
					<Container className={styles.container}>
						<PartnerCard
							logo="/images/logos/onisep.svg"
							link="https://www.onisep.fr/"
							linkLabel="Aller sur le site de l’ONISEP"
						>
							L’Onisep est un établissement public, sous tutelle du ministère de
							l’Education nationale, de la Jeunesse et des Sports, et du
							ministère de l’Enseignement supérieur, de la Recherche et de
							l’Innovation. Il a pour mission d’informer sur les secteurs
							professionnels, les métiers et les formations via ses productions
							numériques, imprimées, et ses services. Il accompagne les familles
							et les équipes éducatives en leur fournissant des ressources, des
							outils et dispositifs permettant de construire un parcours de
							formation et un projet professionnel tout au long de la vie.
						</PartnerCard>
						<div className={styles.partnerInfo}>
							<Icon name="information" className={styles.partnerInfoIcon}/>
							<span>Idéo-fiches métiers, Onisep, 14/09/2022, sous licence ODBL</span>
						</div>
					</Container>
				</div>
			</main>
		</>
	);
}

interface FicheMetierContext extends ParsedUrlQuery {
	id: string
}

export async function getStaticProps(context: GetStaticPropsContext<FicheMetierContext>): Promise<GetStaticPropsResult<ConsulterFicheMetierPageProps>> {
	if (!context.params) {
		throw new PageContextParamsException();
	}

	const { id } = context.params;
	const response = await dependencies.cmsDependencies.consulterFicheMetier.handle(id);

	if (response.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			ficheMetier: JSON.parse(JSON.stringify(response.result)),
		},
		revalidate: 86400,
	};
}

export async function getStaticPaths(): Promise<GetStaticPathsResult> {
	return {
		fallback: 'blocking',
		paths: [],
	};
}
