import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function MétierDuSoinPartner() {
	return (
		<PartnerCard
			linkLabel="En savoir plus"
			logo="/images/logos/métiers-du-soin.svg"
			link="https://solidarites-sante.gouv.fr/metiers-et-concours/metiers-soin-et-accompagnement/metiersdusoin"
			description="Vous aussi devenez aide-soignant, infirmier, éducateur spécialisé, accompagnant éducatif et social…. Renseignez-vous sur les métiers du soin et de l’accompagnement et découvrez toutes les formations pour les rejoindre."
			title="Renseignez-vous sur les métiers du soin"
			titleAs="h3"
		/>
	);
}
