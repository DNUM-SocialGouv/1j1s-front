import { GetStaticPropsResult } from 'next';
import React, { useMemo } from 'react';

import ActualiteCard from '~/client/components/features/Actualites/ActualiteCard';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useAnalytics from '~/client/hooks/useAnalytics';
import { Actualite } from '~/server/actualites/domain/actualite';
import { isFailure } from '~/server/errors/either';
import { dependencies } from '~/server/start';
import { ISODateTime } from '~/shared/ISODateTime';

import analytics from './index.analytics';
import styles from './index.module.scss';

interface ActualitesPageProps {
	cartesActualites: Array<Actualite>
}
const MAX_VISIBLE_ACTUALITES = 3;

export function ActualitesPage({ cartesActualites }: ActualitesPageProps) {
	useAnalytics(analytics);

	const articleCardList = useMemo(() => {
		return cartesActualites.map((carte) => {
			return (
				<ActualiteCard actualite={carte} key={carte.titre} />
			);
		});
	}, [cartesActualites]);

	return (
		<>
			<Head
				title="Actualités | 1jeune1solution"
				robots="index,follow" />
			<main id="contenu" className={styles.actualites}>
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Actualités : retrouvez une sélection</LightHeroPrimaryText>
						<LightHeroSecondaryText>des dernières actualités relatives aux jeunes</LightHeroSecondaryText>
					</h1>
				</LightHero>
				<Container>
					<SeeMoreItemList
						seeLessAriaLabel={'Voir moins de résultats sur les actualités'}
						seeMoreAriaLabel={'Voir plus de résultats sur les actualités'}
						numberOfVisibleItems={MAX_VISIBLE_ACTUALITES}
						itemList={articleCardList} />
				</Container>
			</main>
		</>
	);
}

type SerializedActualite = Omit<Actualite, 'dateMiseAJour'> & {
	dateMiseAJour?: ISODateTime
}
interface SerializedActualitesPageProps {
	cartesActualites: Array<SerializedActualite>
}
function deserialize(actualites: Array<SerializedActualite>): Array<Actualite> {
	return actualites.map((actualite) => ({
		...actualite,
		dateMiseAJour: actualite.dateMiseAJour ? new Date(actualite.dateMiseAJour) : undefined,
	}));
}
function serialize(cartesActualitesResponse: Array<Actualite>): Array<SerializedActualite> {
	return JSON.parse(JSON.stringify(cartesActualitesResponse));
}
export default function Deserialize(props: SerializedActualitesPageProps) {
	const deserializedActus = deserialize(props.cartesActualites);
	return <ActualitesPage cartesActualites={deserializedActus} />;
}
export async function getStaticProps(): Promise<GetStaticPropsResult<SerializedActualitesPageProps>> {
	const isEspaceJeuneVisible = process.env.NEXT_PUBLIC_OLD_ESPACE_JEUNE_FEATURE === '0';
	if (!isEspaceJeuneVisible) {
		return { notFound: true };
	}

	const cartesActualitesResponse = await dependencies.actualitesDependencies.consulterActualitesUseCase.handle();

	if (isFailure(cartesActualitesResponse)) {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			cartesActualites: serialize(cartesActualitesResponse.result),
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}

