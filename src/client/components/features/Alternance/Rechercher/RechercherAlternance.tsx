import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';

export function RechercherAlternance() {
	return (
		<>
			<Head
				title={'Rechercher une alternance | 1jeune1solution'}
				description="Des milliers d’alternances sélectionnées pour vous"
				robots="index,follow"
			/>
			<main id="contenu">
				<LightHero>
					<h1>
						<LightHeroPrimaryText>Avec La Bonne Alternance, trouvez l’entreprise qu’il vous faut</LightHeroPrimaryText>
						<LightHeroSecondaryText>pour réaliser votre projet d’alternance</LightHeroSecondaryText>
					</h1>
				</LightHero>
			</main>
		</>
	);
}
