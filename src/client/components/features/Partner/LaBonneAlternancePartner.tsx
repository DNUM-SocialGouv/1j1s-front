import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function LaBonneAlternancePartner() {
	return (
		<PartnerCard
			linkLabel="J’accède au site web"
			link="https://labonnealternance.apprentissage.beta.gouv.fr/"
			logo="/images/logos/la-bonne-alternance.svg"
			title="Étendez votre recherche à LaBonneAlternance"
		>
			Vous ne trouvez pas de contrat ou d’offres d’alternance ? Essayez La bonne alternance !
		</PartnerCard>
	);
}
