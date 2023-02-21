import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText } from '~/client/components/ui/Hero/LightHero';
import StageDeposerOffreFormulaireEnvoye from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireEnvoye';

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
				<StageDeposerOffreFormulaireEnvoye/>
			</main>	
		</>
	);
}
