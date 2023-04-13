import React from 'react';

import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './CampagneApprentissage.module.scss';

export function CampagneApprentissage() {
	return (
		<header className={styles.simulateur}>
			<HeroWithIllustration image={'/images/campagne-apprentissage.webp'} className={styles.hero}>
				<h1>L’apprentissage : <small>pour moi c’est le bon choix</small></h1>
				<Link href={'/apprentissage/simulation'} appearance={'asPrimaryButton'} className={styles.cta}>Simuler ma rémunération</Link>
			</HeroWithIllustration>
		</header>

	);
}
