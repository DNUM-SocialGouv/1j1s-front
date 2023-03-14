import React from 'react';

import Entreprise from '~/client/components/features/OffreDeStage/FormulaireDeposerOffre/Etape1Entreprise/FormulaireDeposerOffreDeStageEtape1Entreprise';
import { Head } from '~/client/components/head/Head';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import useReferrer from '~/client/hooks/useReferrer';

import styles from './index.module.scss';

export const ETAPE_1_ENTREPRISE = 'formulaireEtape1';
export const ETAPE_2_OFFRE_DE_STAGE = 'formulaireEtape2';
export const ETAPE_3_LOCALISATION = 'formulaireEtape3';

export const URL_DEPOSER_OFFRE = '/stages/deposer-offre';

export default function DeposerOffreStagePage() {
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
