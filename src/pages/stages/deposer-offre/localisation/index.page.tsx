import React from 'react';

import { HeadTag } from '~/client/components/head/HeaderTag';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useReferrer from '~/client/hooks/useReferrer';
import Localisation from '~/pages/stages/deposer-offre/Formulaire/StageDeposerOffreFormulaireLocalisation';

import styles from './DeposerOffreStageEtape3.module.scss';

export default function DeposerOffreStageEtape3Page() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Dépôt d’offre de stage - Etape 3 sur 3 : Localisation du stage | 1jeune1solution'}
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
				<Localisation/>
			</main>
		</>
	);
}
