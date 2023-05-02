import React from 'react';

import { ServiceCard } from './Card/ServiceCard';

export function LaBonneAlternancePartner() {
	return (
		<ServiceCard
			linkLabel="J’accède au site web"
			link="https://labonnealternance.apprentissage.beta.gouv.fr/"
			logo="/images/logos/la-bonne-alternance.svg"
			title="Étendez votre recherche à LaBonneAlternance"
			titleAs={'h3'}
		>
			Vous ne trouvez pas de contrat ou d’offres d’alternance ? Essayez La bonne alternance !
		</ServiceCard>
	);
}
