import classNames from 'classnames';
import { GetStaticPropsResult } from 'next';
import React, { useMemo } from 'react';

import ActualiteCard from '~/client/components/features/Actualites/ActualiteCard';
import { ServicesJeunes } from '~/client/components/features/ServicesJeunes/ServicesJeunes';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/espace-jeune/index.analytics';
import { Accueil } from '~/pages/index.page';
import { Actualite } from '~/server/actualites/domain/actualite';
import { isFailure } from '~/server/errors/either';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { dependencies } from '~/server/start';
import { ISODateTime } from '~/shared/ISODateTime';

import styles from './index.module.scss';

type EspaceJeunePageProps = {
	cartesActualites: Array<Actualite>
	serviceJeuneList: Array<ServiceJeune>
}
type SerializedActualite = Omit<Actualite, 'dateMiseAJour'> & {
	dateMiseAJour?: ISODateTime
}
type SerializedEspaceJeunePageProps = {
	cartesActualites: Array<SerializedActualite>
	serviceJeuneList: Array<ServiceJeune>
}


const MAX_VISIBLE_ACTUALITES_LENGTH = 3;
function deserialize(actualites: Array<SerializedActualite>): Array<Actualite> {
	return actualites.map((actualite) => ({
		...actualite,
		dateMiseAJour: actualite.dateMiseAJour ? new Date(actualite.dateMiseAJour) : undefined,
	}));
}
function serialize<SerializedType, InitialType>(cartesActualitesResponse: InitialType): SerializedType {
	return JSON.parse(JSON.stringify(cartesActualitesResponse));
}

export default function Deserialize(props: SerializedEspaceJeunePageProps) {
	const deserializedActus = deserialize(props.cartesActualites);
	return <Accueil	actualites={deserializedActus} />;
}

export function EspaceJeunePage({ cartesActualites, serviceJeuneList }: EspaceJeunePageProps) {
	useAnalytics(analytics);

	const articleCardList: React.ReactNode[] = useMemo(() => {
		return cartesActualites.map((carte) => (
			<ActualiteCard actualite={carte} headingLevel={'h3'} key={carte.titre} className={styles.carteActualite} />
		));
	}, [cartesActualites]);

	return (
		<>
			<Head
				title="Actualités et services jeunes | 1jeune1solution"
				robots="index,follow" />
			<main id="contenu">

				<h1 className={styles.title}>Actualités et services jeune</h1>
				<section className={classNames(styles.section, styles.actualitesSection)} aria-label="les actualités">
					<LightHero>
						<h2>
							<LightHeroPrimaryText>Actualités : retrouvez une sélection</LightHeroPrimaryText>
							<LightHeroSecondaryText>des dernières actualités relatives aux jeunes</LightHeroSecondaryText>
						</h2>
					</LightHero>
					<Container className={styles.cartesActualitesList}>
						<SeeMoreItemList className={styles.seeMoreButton}
														 seeLessAriaLabel={'Voir moins de résultats sur les actualités'}
														 seeMoreAriaLabel={'Voir plus de résultats sur les actualités'}
														 numberOfVisibleItems={MAX_VISIBLE_ACTUALITES_LENGTH}
														 itemList={articleCardList} />
					</Container>
				</section>
				<section className={classNames(styles.section, styles.mesuresJeunesSection)} aria-label="les services jeunes">
					<LightHero>
						<h2>
							<LightHeroPrimaryText>Services jeunes, retrouvez les services conçus pour vous :</LightHeroPrimaryText>
							<LightHeroSecondaryText>
								entrée dans la vie professionnelle, orientation, formation, accompagnement
							</LightHeroSecondaryText>
						</h2>
					</LightHero>
					<ServicesJeunes cardList={serviceJeuneList} />
				</section>
			</main>
		</>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<SerializedEspaceJeunePageProps>> {
	const isEspaceJeuneVisible = process.env.NEXT_PUBLIC_OLD_ESPACE_JEUNE_FEATURE === '1';
	if (!isEspaceJeuneVisible) {
		return { notFound: true };
	}
	
	const serviceJeuneList = await dependencies.servicesJeunesDependencies.consulterLesServicesJeunesUseCase.handle();
	const cartesActualitesResponse = await dependencies.actualitesDependencies.consulterActualitesUseCase.handle();

	if (isFailure(serviceJeuneList) || isFailure(cartesActualitesResponse)) {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			cartesActualites: serialize(cartesActualitesResponse.result),
			serviceJeuneList: serialize(serviceJeuneList.result),
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}

