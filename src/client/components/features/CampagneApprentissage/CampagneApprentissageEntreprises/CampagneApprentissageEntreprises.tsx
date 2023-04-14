import React from 'react';

import { Container } from '~/client/components/layouts/Container/Container';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';

export function CampagneApprentissageEntreprises() {
	return (
		<>
			<header className={styles.simulateur}>
				<HeroWithIllustration image={'/images/campagne-apprentissage.webp'} className={styles.hero}>
					<h1>L’apprentissage : <small>le bon choix pour votre entreprise</small></h1>
					<Link href={'/apprentissage/simulation'} appearance={'asPrimaryButton'} className={styles.cta}>Simuler le coût d’embauche</Link>
				</HeroWithIllustration>
			</header>

			<Container>
				<section aria-labelledby={'titre-section-raisons'} className={styles.raisons}>
					<h2 id={'titre-section-raisons'}>Choisir l’apprentissage c’est…</h2>
					<ul>
						<li>Obtenir un diplôme reconnu</li>
						<li>Apprendre en pratiquant</li>
						<li>Une formation gratuite</li>
						<li>Avoir une expérience professionnelle complète</li>
						<li>Un salaire chaque mois</li>
					</ul>
				</section>
			</Container>
		</>
	);
}
