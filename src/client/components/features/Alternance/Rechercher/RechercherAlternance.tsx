import React from 'react';

import { HeadTag } from '~/client/components/head/HeaderTag';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';

export function RechercherAlternance() {
	return (
		<>
			<HeadTag
				title={'Rechercher une alternance | 1jeune1solution'}
				description="Des milliers d’alternances sélectionnées pour vous"
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
