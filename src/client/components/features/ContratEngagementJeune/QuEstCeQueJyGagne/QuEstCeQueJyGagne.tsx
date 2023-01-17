import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/QuEstCeQueJyGagne/QuEstCeQueJyGagne.module.scss';
import SeeMoreMobileOnly from '~/client/components/ui/SeeMore/MobileOnly/SeeMoreMobileOnly';

export default function QuEstCeQueJyGagne() {
	return (
		<section className={styles.section}>
			<div className={styles.container}>
				<div className={styles.titre}>
					<h2>Mais en vrai, qu‘est-ce que j‘y gagne à long terme ?</h2>
					<div className={styles.sousTitre}>Le contrat d‘Engagement Jeune, c‘est tout bénéf‘ pour moi !</div>
				</div>
				<SeeMoreMobileOnly>
					<GainsCEJ />
				</SeeMoreMobileOnly>
			</div>
		</section>
	);
}

function GainsCEJ() {
	return (
		<div className={styles.contenu}>
			<div id="gainsCEJ" className="bold">
				Quand je m‘engage, je prépare mon avenir et je mets toutes les chances de mon côté pour :
			</div>
			<ul aria-labelledby="gainsCEJ">
				<li>
					Définir et bâtir un <b>projet professionnel durable</b>
				</li>
				<li>
					Mettre en valeur <b>mes talents et mes compétences</b>
				</li>
				<li>
					<b>Découvrir le monde professionnel</b> et comprendre son fonctionnement et ses codes
				</li>
				<li>
					<b>Construire mon réseau</b> pour trouver plus facilement et plus rapidement un emploi
				</li>
			</ul>
		</div>
	);
}
