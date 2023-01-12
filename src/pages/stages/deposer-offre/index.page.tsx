import React from 'react';

import { Hero } from '~/client/components/ui/Hero/Hero';
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
				<Hero className={styles.hero}>
					<span>Déposez votre offre de stage </span>
					<span>sur 1jeune1solution</span>
				</Hero>
			</main>
		</>
	);
}
