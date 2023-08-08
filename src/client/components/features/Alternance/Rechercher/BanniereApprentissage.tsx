import React from 'react';

import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';

export function BanniereApprentissage() {
	return (
		<LightHero>
			<h1>
				<LightHeroPrimaryText>Avec La bonne alternance, trouvez l’entreprise qu’il vous
					faut</LightHeroPrimaryText>
			</h1>
			<LightHeroSecondaryText>pour réaliser votre projet d’alternance</LightHeroSecondaryText>
		</LightHero>
	);
}
