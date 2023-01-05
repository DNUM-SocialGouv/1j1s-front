import React from 'react';

import { EspaceJeuneFlippingCardList } from '~/client/components/features/EspaceJeune/EspaceJeuneFlippingCardList';
import { CarteEspaceJeune, EspaceJeune } from '~/server/cms/domain/espaceJeune';

interface EspaceJeuneProps {
  espaceJeune : EspaceJeune
}

export function EspaceJeuneComponent({ espaceJeune }: EspaceJeuneProps) {
	const { vieProfessionnelle, accompagnement, orienterFormer } = espaceJeune;
	const MAX_CARTE_PER_ROW = 9;
	const cardList: CarteEspaceJeune[] = [...accompagnement, ...orienterFormer, ...vieProfessionnelle ]
		.sort((a, b) => a.titre.localeCompare(b.titre));

	return (
		<>
			<EspaceJeuneFlippingCardList cardList={cardList} maxCardPerRow={MAX_CARTE_PER_ROW} />
		</>
	);
}
