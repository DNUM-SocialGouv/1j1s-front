import React from 'react';

import { Head } from '~/client/components/head/Head';
import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';
import useReferrer from '~/client/hooks/useReferrer';
import OffreStage from '../../../../client/components/features/OffreDeStage/FormulaireDeposerOffre/Etape2Stage/FormulaireDeposerOffreDeStageEtape2Stage';

import styles from './DeposerOffreStageEtape2.module.scss';

export default function DeposerOffreStageEtape2Page() {
	useReferrer();

	return (
		<>
			<Head
				title={'Dépôt d’offre de stage - Etape 2 sur 3 : Votre offre de stage | 1jeune1solution'}
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
				<OffreStage/>
			</main>
		</>
	);
}
