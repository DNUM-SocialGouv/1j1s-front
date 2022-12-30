import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Pourquoi/PourquoiCEstFaitPourMoi.module.scss';
import { Icon } from '~/client/components/ui/Icon/Icon';


export default function PourquoiCEstFaitPourMoi() {
	const arrow = <Icon name={'arrow-right'} className={styles.arrow}/>;

	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<h2 className={styles.titre}>Le Contrat d‘Engagement Jeune est fait pour moi si :</h2>
				<ul className={styles.liste}>
					<li>{arrow} <span><strong>J‘ai entre 16 et 25 ans</strong> (moins de 30 si je suis en situation de handicap)</span></li>
					<li>{arrow} <span><strong>Je suis sans emploi ni formation</strong></span></li>
					<li>{arrow} <span><strong>Je n‘ai pas de projet professionnel défini</strong> et j‘ai perdu confiance en moi</span></li>
					<li>{arrow} <span><strong>J‘ai fait face à des difficultés matérielles et financières</strong></span></li>
					<li>{arrow} <span><strong>Je suis prêt(e) à m‘engager</strong> à suivre le programme</span></li>
				</ul>
			</div>
		</section>
	);
}

