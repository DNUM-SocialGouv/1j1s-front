import React from 'react';

import { HeadTag } from '~/client/components/head/HeaderTag';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useReferrer from '~/client/hooks/useReferrer';
import Entreprise from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireEntreprise';

import styles from './DeposerOffreStageEtape1.module.scss';

export default function DeposerOffreStagePage() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Dépôt d’offre de stage - Etape 1 sur 3 : Votre entreprise | 1jeune1solution '}
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
