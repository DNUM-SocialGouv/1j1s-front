import React from 'react';

import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';

import styles from './CampagneApprentissage.module.scss';

export function CampagneApprentissage() {
	return (
		<main id="contenu" className={styles.simulateur}>
			<HeroWithIllustration image={'/images/campagne-apprentissage.webp'} className={styles.hero}>
				<div className={styles.textContent}>
					<h1>L’apprentissage : <small>pour moi c’est le bon choix</small></h1>
					<p>Avant de démarrer la simulation de vos aides, pensez à vous munir de vos ressources et de celles de vos parents si vous êtes encore à leur charge.</p>
					<Link href={'/apprentissage/simulation'} appearance={'asPrimaryButton'} className={styles.cta}>Simuler ma rémunération</Link>
				</div>
			</HeroWithIllustration>
		</main>
	);
}
