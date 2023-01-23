import React from 'react';

import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';

import styles from '../DeposerOffreStage.module.scss';
import OffreStage from '../Formulaire/StageDeposerOffreFormulaireStage';

export default function DeposerOffreStageEtape2Page() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Dépôt d’offre de stage - Etape 2 sur 3 : Votre offre de stage | 1jeune1solution'}
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
				<OffreStage/>
			</main>
		</>
	);
}
