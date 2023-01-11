import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function SimulationAlternancePartner() {
	return (
		<PartnerCard
			linkLabel="J‘accède au site web"
			logo="/images/logos/portail-alternance.png"
			link="https://www.alternance.emploi.gouv.fr/simulateur-alternant/etape-1"
			title="Vous êtes alternant ?"
			headline="Simulez en quelques clics"
			description="et moins de 3 minutes le montant de la rémunération à laquelle vous aurez droit en fonction de votre formation et de votre contrat. "
			titleAs="h3"
		/>
	);
}
