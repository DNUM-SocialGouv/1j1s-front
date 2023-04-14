import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function PassPartner() {
	return (
		<PartnerCard
			linkLabel="Accéder au site web"
			link="https://www.pass.fonction-publique.gouv.fr/"
			logo="/images/logos/pass.png"
			title="Recherche une offre d'alternance dans la fonction publique"
		>
			La fonction publique accueille des apprentis dans tous les domaines et
			de tous niveaux. Découvrez les offres sur la place de l’apprentissage et des stages.
		</PartnerCard>
	);
}
