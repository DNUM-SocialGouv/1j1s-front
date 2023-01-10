import React from 'react';

import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';

import { Hero } from '../../../client/components/ui/Hero/Hero';
import styles from './DeposerOffreStage.module.scss';

export default function DeposerOffreStagePage() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Rechercher un stage | 1jeune1solution'}
				description="Des milliers d‘offres de stages sélectionnées pour vous"/>
			<Hero className={styles.bannière}>
				<span>Déposez votre offre de stage </span>
				<span>sur 1jeune1solution</span>
			</Hero>
		</>
	);
}
