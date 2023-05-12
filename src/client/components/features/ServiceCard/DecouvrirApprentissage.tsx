import React from 'react';

import { ServiceCard } from './Card/ServiceCard';

export function DecouvrirApprentissage() {
	return (
		<ServiceCard
			imageFit="cover"
			linkLabel="Découvrir l‘apprentissage"
			link="/choisir-apprentissage"
			logo="/images/campagne-apprentissage-jeune.webp"
			title="L’apprentissage est-il fait pour vous ?"
			titleAs="h3"
		>
			Découvrez tout sur l‘apprentissage et simulez la rémunération que vous pourriez avoir en devenant apprenti&middot;e !
		</ServiceCard>
	);
}
