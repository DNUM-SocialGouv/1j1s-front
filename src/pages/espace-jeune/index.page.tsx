import classNames from 'classnames';
import { GetStaticPropsResult } from 'next';
import React, { useCallback, useMemo } from 'react';

import { EspaceJeuneComponent } from '~/client/components/features/EspaceJeune/EspaceJeune';
import { Container } from '~/client/components/layouts/Container/Container';
import { ArticleCard } from '~/client/components/ui/Card/ArticleCard';
import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';
import { CarteActualite } from '~/server/cms/domain/actualite';
import { EspaceJeune } from '~/server/cms/domain/espaceJeune';
import { dependencies } from '~/server/start';

import styles from './espace-jeune.module.scss';

interface EspaceJeunePageProps {
  cartesActualites: CarteActualite[]
  espaceJeune: EspaceJeune
}

const MAX_VISIBLE_ACTUALITES_LENGTH = 6;

export default function EspaceJeunePage({ cartesActualites, espaceJeune }: EspaceJeunePageProps) {
	useReferrer();

	const visibleCartesActualitesList = useMemo(() => cartesActualites.slice(0, MAX_VISIBLE_ACTUALITES_LENGTH), [cartesActualites]);
	const seeMoreCartesActualitesList = useMemo(() => cartesActualites.slice(MAX_VISIBLE_ACTUALITES_LENGTH), [cartesActualites]);

	const getCarteActualiteLinkLabel = useCallback(({ article }: CarteActualite): string | undefined => {
		if (!article) return 'En savoir plus';
	}, []);
	const getCarteActualiteLinkIcon = useCallback(({ article }: CarteActualite): React.ReactNode | undefined => {
		if (!article) return <Icon name={'external-redirection'} />;
	}, []);

	return (
		<main id={'contenu'}>
			<HeadTag title="Espace jeune | 1jeune1solution"/>
			<h1 className={styles.title}>Actualités et services jeune</h1>
			{cartesActualites.length > 0 &&
				<section className={classNames(styles.section, styles.actualitesSection)} data-testid='actualites' >
					<LightHero
						className={styles.sectionTitle}
						titleAs={'h2'}
						primaryText={'Actualités : retrouvez une sélection'}
						secondaryText={'des dernières actualités relatives aux jeunes'} />
					<Container className={styles.cartesActualitesList}>
						{visibleCartesActualitesList.map((carte, index) =>
							<ArticleCard className={styles.carteActualite}
								key={index}
								imageSrc={carte.bannière && carte.bannière.url || ''}
								titleLabel={carte.titre}
								link={carte.link}
								linkLabel={getCarteActualiteLinkLabel(carte)}
								icon={getCarteActualiteLinkIcon(carte)}>
								<p className={styles.carteActualiteDescription}>{carte.extraitContenu}</p>
							</ArticleCard>,
						)}
					</Container>
					<SeeMore>
						<Container className={styles.cartesActualitesList}>
							{seeMoreCartesActualitesList.map((carte, index) =>
								<ArticleCard className={styles.carteActualite}
									key={index}
									imageSrc={carte.bannière && carte.bannière.url || ''}
									titleLabel={carte.titre}
									link={carte.link}
									linkLabel={getCarteActualiteLinkLabel(carte)}
									icon={getCarteActualiteLinkIcon(carte)}>
									<p className={styles.carteActualiteDescription}>{carte.extraitContenu}</p>
								</ArticleCard>,
							)}
						</Container>
					</SeeMore>
				</section>
			}
			<section className={classNames(styles.section, styles.mesuresJeunesSection)} data-testid={'espace-jeune'}>
				<LightHero
					className={styles.sectionTitle}
					titleAs={'h2'}
					primaryText={'Services jeunes, retrouvez les services conçus pour vous :'}
					secondaryText={'entrée dans la vie professionnelle, orientation, formation, accompagnement'} />
				<EspaceJeuneComponent espaceJeune={espaceJeune} />
			</section>
		</main>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<EspaceJeunePageProps>> {
	const espaceJeuneResponse = await dependencies.cmsDependencies.récupérerEspaceJeune.handle();
	const cartesActualitesResponse = await dependencies.cmsDependencies.récupererActualites.handle();

	if (espaceJeuneResponse.instance === 'failure' || cartesActualitesResponse.instance === 'failure') {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			cartesActualites: JSON.parse(JSON.stringify(cartesActualitesResponse.result)),
			espaceJeune: JSON.parse(JSON.stringify(espaceJeuneResponse.result)),
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}

