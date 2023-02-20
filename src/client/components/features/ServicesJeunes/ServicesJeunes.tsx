import React, { useMemo } from 'react';

import styles from '~/client/components/features/ServicesJeunes/ServicesJeunes.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { FlippingCard } from '~/client/components/ui/Card/Flipping/FlippingCard';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useSanitize from '~/client/hooks/useSanitize';
import { ServiceJeune } from '~/server/cms/domain/serviceJeune';

interface ServicesJeunesProps {
	cardList: Array<ServiceJeune>
}

const NUMBER_OF_VISIBLE_ITEMS = 9;

export function ServicesJeunes(props: ServicesJeunesProps) {
	const { cardList } = props;

	const cardListToDisplay = useMemo(() =>
		cardList.map((carte, index) =>
			<ServiceJeuneCard serviceJeune={carte} key={index} />,
		), [cardList]);

	return (
		<>
			<Container>
				<SeeMoreItemList
					seeLessLabel="Voir moins de services"
					seeMoreLabel="Voir plus de services"
					seeLessAriaLabel={'Voir moins de résultats sur les services conçus pour les jeunes'}
					seeMoreAriaLabel={'Voir plus de résultats sur les services conçus pour les jeunes'}
					numberOfVisibleItems={NUMBER_OF_VISIBLE_ITEMS}
					itemList={cardListToDisplay} />
			</Container>
		</>
	);
}

interface ServiceJeuneCardProps {
	serviceJeune: ServiceJeune;
}

function ServiceJeuneCard({ serviceJeune }: ServiceJeuneCardProps) {
	const titre = useSanitize(serviceJeune.titre);
	const categorie = serviceJeune.categorie;
	const bannière = serviceJeune.bannière?.src || '';
	const link = serviceJeune.link;
	const concerné = serviceJeune.concerné || '';

	return <FlippingCard
		className={styles.card}
		category={categorie}
		imageUrl={bannière}
		link={link}
		title={titre}
		flippingCardContent={concerné}
	/>;
}
