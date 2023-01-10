import React from 'react';

import { LightHero, LightHeroPrimaryText, LightHeroSecondaryText } from '~/client/components/ui/Hero/LightHero';

import styles from './Bannière.module.scss';


export default function Bannière () {

	return (
		<LightHero className={styles.bannière}>
			<h1>
				<LightHeroPrimaryText>
					Employeurs, découvrez toutes les mesures du plan 1 jeune 1 solution pour vous aider à
				</LightHeroPrimaryText>
				<LightHeroSecondaryText>
					recruter plus facilement
				</LightHeroSecondaryText>
			</h1>
		</LightHero>
	);
}
