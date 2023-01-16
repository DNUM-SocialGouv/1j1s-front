import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';

export function LaBonneBoitePartner() {
	return (
		<PartnerCard
			linkLabel="J‘accède au site web"
			logo="/images/logos/la-bonne-boite.svg"
			link="https://labonneboite.pole-emploi.fr/"
			title="Et si vous contactiez directement les entreprises ?"
			titleAs="h3"
			headline="N'envoyez plus vos CV au hasard !"
			headlineColor="pink"
			description="Identifiez et contactez les entreprises qui peuvent être susceptibles de recruter même si elles n'ont pas déposé d‘offres. Nos outils détectent les entreprises qui vont probablement embaucher dans les 6 prochains mois."
		/>
	);
}
