import React, { useMemo } from 'react';

import styles from '~/client/components/features/EspaceJeune/EspaceJeune.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { FlippingCard } from '~/client/components/ui/Card/Flipping/FlippingCard';
import SeeMoreItemList from '~/client/components/ui/SeeMore/SeeMoreItemList';
import useSanitize from '~/client/hooks/useSanitize';
import { CarteEspaceJeune } from '~/server/cms/domain/espaceJeune';

interface EspaceJeuneFlippingCardListProps {
	cardList: CarteEspaceJeune[]
	maxCardPerRow: number
}

export function EspaceJeuneFlippingCardList(props: EspaceJeuneFlippingCardListProps) {
	const { cardList, maxCardPerRow } = props;

	function CarteEspaceJeune({ carte, index }: { carte: CarteEspaceJeune, index: number }) {
		const titre = useSanitize(carte.titre);
		const categorie = carte.categorie;
		const bannière = carte.bannière?.url || '';
		const link = carte.link;
		const concerné = carte.concerné || '';

		return <FlippingCard
			className={styles.card}
			category={categorie}
			key={index}
			imageUrl={bannière}
			link={link}
			title={titre}
			flippingCardContent={concerné}
			data-testid="carteEspaceJeune"
		/>;
	}
	
	const cardListToDisplay = useMemo(() =>
		cardList.map((carte, index) =>
			<CarteEspaceJeune carte={carte} index={index} key={index} />,
		), [cardList]);

	return (
		<>
			<Container>
				<SeeMoreItemList
					seeLessLabel="Voir moins de services"
					seeMoreLabel="Voir plus de services"
					seeLessAriaLabel={'Voir moins de résultats sur les services conçus pour les jeunes'}
					seeMoreAriaLabel={'Voir plus de résultats sur les services conçus pour les jeunes'}
					numberOfVisibleItems={maxCardPerRow}
					itemList={cardListToDisplay} />
			</Container>
			
		</>
	);
}
