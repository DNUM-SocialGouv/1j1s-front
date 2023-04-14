import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function OnisepPartner() {
	return (
		<PartnerCard
			linkLabel="Découvrir les métiers"
			link="/decouvrir-les-metiers"
			logo="/images/logos/onisep.svg"
			title="Besoin d‘informations sur les métiers ?"
		>
			Renseignez-vous sur les différents métiers avec l’ONISEP. Trouvez un métier qui vous correspond parmi plus de 700
			fiches.
		</PartnerCard>
	);
}
