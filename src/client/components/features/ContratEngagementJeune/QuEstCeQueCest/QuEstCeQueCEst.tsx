import Image from 'next/image';
import illustration from 'public/images/CEJ/what-it-is.png';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';

export default function QuEstCeQueCEst() {
	return (
		<section className={styles.section}>
			<Container className={ styles.container }>
				<aside className={styles.illustration}>
					<Image src={illustration} fill alt=""/>
				</aside>
				<article className={styles.article}>
					<h2>Le Contrat d‘Engagement Jeune, qu‘est-ce que c‘est ?</h2>
					<p>
						<b>Un parcours entièrement personnalisé qui peut durer de 6 à 12 mois<sup>*</sup></b> en fonction de mon
						profil, pour m‘aider à définir mon projet professionnel et à trouver un emploi.
					</p>
					<div id="beneficesCEJ">Quand je signe mon contrat, je bénéficie de :</div>
					<ul aria-labelledby="beneficesCEJ">
						<li>
							<b>Un accompagnement personnalisé avec un conseiller dédié</b> qui me suit tout au long de mon parcours et
							jusqu‘à ce que j‘accède à un emploi durable
						</li>
						<li>
							<b>Un programme intensif</b> de 15 à 20 heures par semaine composé de différents types d‘activités
						</li>
						<li>
							<b>Une allocation pouvant aller jusqu‘à 520 euros par mois</b> en fonction de mes ressources et à
							condition que je respecte mes engagements
						</li>
					</ul>
					<sub>(*) La durée de l‘accompagnement peut exceptionnellement aller jusqu‘à 18 mois</sub>
				</article>
			</Container>
		</section>
	);
}
