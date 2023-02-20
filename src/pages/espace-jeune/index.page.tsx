import classNames from 'classnames';
import { GetStaticPropsResult } from 'next';
import React, { useCallback, useMemo } from 'react';

import { ServicesJeunes } from '~/client/components/features/ServicesJeunes/ServicesJeunes';
import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { ArticleCard } from '~/client/components/ui/Card/Article/ArticleCard';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useReferrer from '~/client/hooks/useReferrer';
import { Actualite } from '~/server/cms/domain/actualite';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';
import { dependencies } from '~/server/start';

import styles from './espace-jeune.module.scss';

interface EspaceJeunePageProps {
	cartesActualites: Actualite[]
	serviceJeuneList: Array<ServiceJeune>
}

const MAX_VISIBLE_ACTUALITES_LENGTH = 6;

export default function EspaceJeunePage({ cartesActualites, serviceJeuneList }: EspaceJeunePageProps) {
	useReferrer();

	const getCarteActualiteLinkLabel = useCallback(({ article }: Actualite): string | undefined => {
		if (!article) return 'En savoir plus';
	}, []);
	const getCarteActualiteLinkIcon = useCallback(({ article }: Actualite): React.ReactNode | undefined => {
		if (!article) return <Icon name={'external-redirection'}/>;
	}, []);

	const articleCardList: React.ReactNode[] = useMemo(() => {
		return cartesActualites.map((carte, index) =>
			<ArticleCard className={styles.carteActualite}
				key={index}
				imageSrc={carte.bannière && carte.bannière.url || ''}
				titleLabel={carte.titre}
				link={carte.link}
				linkLabel={getCarteActualiteLinkLabel(carte)}
				icon={getCarteActualiteLinkIcon(carte)}>
				<p className={styles.carteActualiteDescription}>{carte.extraitContenu}</p>
			</ArticleCard>,
		);
	}, [cartesActualites, getCarteActualiteLinkIcon, getCarteActualiteLinkLabel]);

	return (
		<main id={'contenu'}>
			<Head
				title="Actualités et services jeunes | 1jeune1solution"
				robots="index,follow"
			/>
			<h1 className={styles.title}>Actualités et services jeune</h1>
			<section className={classNames(styles.section, styles.actualitesSection)} data-testid="actualites">
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
			<section className={classNames(styles.section, styles.mesuresJeunesSection)} data-testid={'espace-jeune'}>
				<LightHero>
					<h2>
						<LightHeroPrimaryText>Services jeunes, retrouvez les services conçus pour vous :</LightHeroPrimaryText>
						<LightHeroSecondaryText>
							entrée dans la vie professionnelle, orientation, formation, accompagnement
						</LightHeroSecondaryText>
					</h2>
				</LightHero>
				<ServicesJeunes cardList={serviceJeuneList}/>
			</section>
		</main>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<EspaceJeunePageProps>> {
	const serviceJeuneList = await dependencies.cmsDependencies.listerServicesJeunes.handle();
	const cartesActualitesResponse = await dependencies.cmsDependencies.récupererActualites.handle();

	if (serviceJeuneList.instance === 'failure' || cartesActualitesResponse.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			cartesActualites: JSON.parse(JSON.stringify(cartesActualitesResponse.result)),
			serviceJeuneList: JSON.parse(JSON.stringify(serviceJeuneList.result)),
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}

