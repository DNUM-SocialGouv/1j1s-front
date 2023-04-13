import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissage
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/EnSavoirPlusApprentissage/EnSavoirPlusApprentissage';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';

export function CampagneApprentissageJeunes() {
	return (
		<>
			<header className={styles.simulateur}>
				<HeroWithIllustration image={'/images/campagne-apprentissage.webp'} className={styles.hero}>
					<h1>L’apprentissage : <small>pour moi c’est le bon choix</small></h1>
					<Link href={'/apprentissage/simulation'} appearance={'asPrimaryButton'} className={styles.cta}>
						Simuler ma rémunération
					</Link>
				</HeroWithIllustration>
			</header>
			<EnSavoirPlusApprentissage/>
		</>
	);
}
