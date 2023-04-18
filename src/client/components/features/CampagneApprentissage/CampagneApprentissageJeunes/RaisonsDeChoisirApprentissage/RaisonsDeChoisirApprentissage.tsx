import React from 'react';
import { Container } from 'src/client/components/layouts/Container/Container';
import { Tuile } from 'src/client/components/ui/Tuile/Tuile';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissageJeunes/RaisonsDeChoisirApprentissage/RaisonsDeChoisirApprentissage.module.scss';


export function RaisonsDeChoisirApprentissage() {
	return <section aria-labelledby={'titre-section-raisons'} className={styles.raisons}>
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
	</section>;
}
