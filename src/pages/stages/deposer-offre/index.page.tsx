import React from 'react';

import { Head } from '~/client/components/head/Head';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import Entreprise from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireEntreprise';

import styles from './DeposerOffreStageEtape1.module.scss';

export const ETAPE_ENTREPRISE = 'formulaireEtape1';
export const ETAPE_OFFRE_DE_STAGE = 'formulaireEtape2';
export const ETAPE_LOCALISATION = 'formulaireEtape3';

export const URL_DEPOSER_OFFRE = '/stages/deposer-offre';

export default function DeposerOffreStagePage() {
	useAnalytics('stages/deposer-offre');
	useReferrer();

	return (
		<>
			<Head
				title={'Dépôt d’offre de stage - Etape 1 sur 3 : Votre entreprise | 1jeune1solution '}
				robots="index,follow"
			/>
			<main id="contenu">
				<div className={styles.section}>
					<LightHero>
						<h1>
							<LightHeroPrimaryText>
								Déposez votre offre de stage
							</LightHeroPrimaryText>
							<LightHeroSecondaryText>
								sur 1jeune1solution
							</LightHeroSecondaryText>
						</h1>
					</LightHero>
				</div>
				<Entreprise/>
			</main>
		</>
	);
}
