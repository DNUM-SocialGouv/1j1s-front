import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissage.module.scss';
import EnSavoirPlusApprentissage
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/EnSavoirPlusApprentissage/EnSavoirPlusApprentissage';
import { Container } from '~/client/components/layouts/Container/Container';
import { HeroWithIllustration } from '~/client/components/ui/Hero/Hero';
import { Icon } from '~/client/components/ui/Icon/Icon';
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

			<Container>
				<section aria-labelledby={'titre-section-raisons'} className={styles.raisons}>
					<h2 id={'titre-section-raisons'}>Choisir l’apprentissage c’est…</h2>
					<ul>
						<li>
							<div className={styles.tuile}>
								<Icon name={'euro'} />
								Obtenir un diplôme reconnu
							</div>
						</li>
						<li>
							<div className={styles.tuile}>
								<Icon name={'euro'}/>
								Apprendre en pratiquant
							</div>
						</li>
						<li>
							<div className={styles.tuile}>
								<Icon name={'euro'}/>
								Une formation gratuite
							</div>
						</li>
						<li>
							<div className={styles.tuile}>
								<Icon name={'euro'}/>
								Avoir une expérience professionnelle complète
							</div>
						</li>
						<li>
							<div className={styles.tuile}>
								<Icon name={'euro'}/>
								Un salaire chaque mois
							</div>
						</li>
					</ul>
				</section>
			</Container>

			<EnSavoirPlusApprentissage/>
		</>
	);
}
