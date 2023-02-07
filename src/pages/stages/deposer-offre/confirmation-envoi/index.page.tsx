import React from 'react';

import { HeadTag } from '~/client/components/head/HeaderTag';
import { LightHero, LightHeroPrimaryText } from '~/client/components/ui/Hero/LightHero';
import StageDeposerOffreFormulaireEnvoye from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireEnvoye';

import styles from './DeposerOffreStageEtapeFin.module.scss';

export default function DeposerOffreStageEnvoyePage() {
	return (
		<>
			<HeadTag
				title={'Dépôt d’offre de stage - Formulaire envoyé | 1jeune1solution'}
			/>
			<LightHero className={styles.hero}>
				<LightHeroPrimaryText>Félicitations, votre offre de stage a bien été envoyée</LightHeroPrimaryText>
			</LightHero>
			<main id="contenu">
				<StageDeposerOffreFormulaireEnvoye/>
			</main>	
		</>
	);
}
