import React from 'react';

import { Hero } from '~/client/components/ui/Hero/Hero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';

export default function DeposerOffreStagePage() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Dépôt d’offre de stage - Etape 1 sur 3 : Votre entreprise | 1jeune1solution '}
			/>
			<main id="contenu">
				<Hero>
					<p><b>Déposez votre offre de stage sur 1jeune1solution</b></p>
				</Hero>
			</main>
		</>
	);
}
