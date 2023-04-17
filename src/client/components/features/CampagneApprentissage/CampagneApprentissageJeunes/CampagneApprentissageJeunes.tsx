import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissage
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/EnSavoirPlusApprentissage/EnSavoirPlusApprentissage';
import { Container } from '~/client/components/layouts/Container/Container';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';
import { Tuile } from '~/client/components/ui/Tuile/Tuile';

export function CampagneApprentissageJeunes() {
	return (
		<>
			<header className={styles.titrePage}>
				<HeroWithIllustration image={'/images/campagne-apprentissage.webp'} className={styles.hero}>
					<h1>L’apprentissage : <small>pour moi c’est le bon choix</small></h1>
					<Link href={'/apprentissage/simulation'} appearance={'asPrimaryButton'} className={styles.cta}>
						Simuler ma rémunération
					</Link>
				</HeroWithIllustration>
			</header>

			<section aria-labelledby={'titre-section-raisons'} className={styles.raisons}>
				<Container>
					<h2 id={'titre-section-raisons'}>Choisir l’apprentissage c’est…</h2>
					<ul>
						<li>
							<Tuile iconName={'euro'} className={styles.tuile}>
								Obtenir un diplôme reconnu
							</Tuile>
						</li>
						<li>
							<Tuile iconName={'account'} className={styles.tuile}>
								Apprendre en pratiquant
							</Tuile>
						</li>
						<li>
							<Tuile iconName={'sun'} className={styles.tuile}>
								Une formation gratuite
							</Tuile>
						</li>
						<li>
							<Tuile iconName={'thumb-up'} className={styles.tuile}>
								Avoir une expérience professionnelle complète
							</Tuile>
						</li>
						<li>
							<Tuile iconName={'euro'} className={styles.tuile}>
								Un salaire chaque mois
							</Tuile>
						</li>
					</ul>
				</Container>
			</section>


			<EnSavoirPlusApprentissage/>
		</>
	);
}
