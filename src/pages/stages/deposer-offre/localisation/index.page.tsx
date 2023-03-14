import React from 'react';

import { Head } from '~/client/components/head/Head';
import {
	LightHero,
	LightHeroPrimaryText,
	LightHeroSecondaryText,
} from '~/client/components/ui/Hero/LightHero';
import useReferrer from '~/client/hooks/useReferrer';
import Localisation from '../../../../client/components/features/OffreDeStage/FormulaireDeposerOffre/Etape3Localisation/FormulaireDeposerOffreDeStageEtape3Localisation';

import styles from './DeposerOffreStageEtape3.module.scss';

export default function DeposerOffreStageEtape3Page() {
	useReferrer();

	return (
		<>
			<Head
				title={'Dépôt d’offre de stage - Etape 3 sur 3 : Localisation du stage | 1jeune1solution'}
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
				<Localisation/>
			</main>
		</>
	);
}
