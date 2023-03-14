import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText } from '~/client/components/ui/Hero/LightHero';
import FormulaireDeposerOffreDeStageEtape4Envoye from '../../../../client/components/features/OffreDeStage/FormulaireDeposerOffre/Etape4Envoye/FormulaireDeposerOffreDeStageEtape4Envoye';

import styles from './DeposerOffreStageEtapeFin.module.scss';

export default function DeposerOffreStageEnvoyePage() {
	return (
		<>
			<Head
				title={'Dépôt d’offre de stage - Formulaire envoyé | 1jeune1solution'}
				robots="index,follow"
			/>
			<LightHero className={styles.hero}>
				<h1>
					<LightHeroPrimaryText>Merci, votre offre de stage a bien été envoyée</LightHeroPrimaryText>
				</h1>
			</LightHero>
			<main id="contenu">
				<FormulaireDeposerOffreDeStageEtape4Envoye/>
			</main>	
		</>
	);
}
