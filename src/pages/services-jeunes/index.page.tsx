import { GetStaticPropsResult } from 'next';
import { useRouter } from 'next/router';
import React from 'react';

import { ServicesJeunes } from '~/client/components/features/ServicesJeunes/ServicesJeunes';
import { Head } from '~/client/components/head/Head';
import { Champ } from '~/client/components/ui/Form/Champ/Champ';
import { SelectMultiple } from '~/client/components/ui/Form/Select/SelectMultiple';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/espace-jeune/index.analytics';
import { isFailure } from '~/server/errors/either';
import { ServiceJeune } from '~/server/services-jeunes/domain/servicesJeunes';
import { dependencies } from '~/server/start';

import styles from './index.module.scss';
import { getArrayQueryParam } from "~/client/utils/queryParams.utils";

interface ServicesJeunePageProps {
	serviceJeuneList: Array<ServiceJeune>
}

export default function ServicesJeunesPage({ serviceJeuneList }: ServicesJeunePageProps) {
	useAnalytics(analytics);

	const { query } = useRouter();
	const typesServicesJeunesFiltresList = getArrayQueryParam(query.typesServicesJeunes) ?? [];
	const typesServicesJeunesReferentielList = [
		'Accompagnement',
		'Aides financières',
		'Orientation et formation',
		'Entrée dans la vie professionnelle',
		'Logement',
		'Engagement',
	];

	return (
		<>
			<Head
				title="Services jeunes | 1jeune1solution"
				robots="index,follow" />
			<main id="contenu">
				<LightHero>
					<h2>
						<LightHeroPrimaryText>Services jeunes, retrouvez les services conçus pour vous :</LightHeroPrimaryText>
						<LightHeroSecondaryText>
							entrée dans la vie professionnelle, orientation, formation, accompagnement, logement, aides et outils
						</LightHeroSecondaryText>
					</h2>
				</LightHero>
				<section className={styles.section} aria-label="les services jeunes">
					<Champ>
						<Champ.Label>
							Types de service à destination des jeunes
							<Champ.Label.Complement>Sélectionnez votre/vos choix</Champ.Label.Complement>
						</Champ.Label>
						<Champ.Input
							render={SelectMultiple}
							optionsAriaLabel={'Types de services jeunes'}
							name={'typesServicesJeunes'}
							onChange={(option) => { return option;}}
							value={typesServicesJeunesReferentielList}>
							{typesServicesJeunesReferentielList.map((option) =>
								<SelectMultiple.Option key={option.libellé} value={option.valeur}>{option.libellé}</SelectMultiple.Option>,
							)}
						</Champ.Input>
						<Champ.Error />
					</Champ>
					<TagList
						list={[
							<>
								<button>
									Hello
									<Icon name={'close'} />
								</button>
							</>,
						]}>
					</TagList>
					<ServicesJeunes cardList={serviceJeuneList} />
				</section>
			</main>
		</>
	);
}

export async function getStaticProps(): Promise<GetStaticPropsResult<ServicesJeunePageProps>> {
	const isServicesJeunesVisible = process.env.NEXT_PUBLIC_OLD_ESPACE_JEUNE_FEATURE === '0';
	if (!isServicesJeunesVisible) {
		return { notFound: true };
	}
	
	const serviceJeuneList = await dependencies.servicesJeunesDependencies.consulterLesServicesJeunesUseCase.handle();

	if (isFailure(serviceJeuneList)) {
		return { notFound: true, revalidate: 1 };
	}

	return {
		props: {
			serviceJeuneList: JSON.parse(JSON.stringify(serviceJeuneList.result)),
		},
		revalidate: dependencies.cmsDependencies.duréeDeValiditéEnSecondes(),
	};
}

