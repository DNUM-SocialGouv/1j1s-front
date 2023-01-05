import classNames from 'classnames';
import React from 'react';

import styles from '~/client/components/features/EspaceJeune/EspaceJeune.module.scss';
import { FlippingCard } from '~/client/components/ui/Card/FlippingCard';
import SeeMore from '~/client/components/ui/SeeMore/SeeMore';
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
			category={categorie}
			key={index}
			imageUrl={bannière}
			link={link}
			title={titre}
			flippingCardContent={concerné}
			data-testid="carteEspaceJeune"
		/>;
	}

	function displayCartes(cardList: CarteEspaceJeune[]) {
		return cardList.map((carte, index) => 
			<li key={index}>
				<CarteEspaceJeune carte={carte} index={index}/>
			</li>,
		);
	}

	return (
		<>
			<ul className={classNames(styles.cardList, styles.cardListPadding)}>
				{displayCartes(cardList.slice(0, maxCardPerRow))}
			</ul>
			{cardList.length > maxCardPerRow &&
        <SeeMore overridedOpenedLabel={'Voir moins de services'} overridedClosedLabel={'Voir plus de services'}>
        	<ul className={classNames(styles.cardList, styles.cardListPadding)}>
        		{displayCartes(cardList.slice(maxCardPerRow))}
        	</ul>
        </SeeMore>
			}
		</>
	);
}
