import React from 'react';

import { LightHero } from '~/client/components/ui/Hero/LightHero';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';

import styles from './DeposerOffreStage.module.scss';

export default function DeposerOffreStagePage() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Dépôt d’offre de stage - Etape 1 sur 3 : Votre entreprise | 1jeune1solution '}
			/>
			<main id="contenu">
				<section className={styles.section}>
					<LightHero className={styles.hero} primaryText={'Déposez votre offre de stage'} secondaryText={'sur 1jeune1solution'} />
				</section>
			</main>
		</>
	);
}
