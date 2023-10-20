import Image from 'next/image';
import illustration from 'public/images/CEJ/what-it-is.png';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/QuEstCeQueCest/QuEstCeQueCEst.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';

import { Footnote } from '../../../ui/Footnote/Footnote';

export default function QuEstCeQueCEst() {
	return (
		<section className={styles.section}>
			<Container className={ styles.container }>
				<div className={styles.illustration}>
					<Image src={illustration} fill alt=""/>
				</div>
				<article className={styles.article}>
					<h2>Le Contrat d‘Engagement Jeune, qu‘est-ce que c‘est ?</h2>
					<p>
						<b>Un parcours entièrement personnalisé qui peut durer jusqu’à 12 mois<Footnote.Reference to={'note-sur-la-duree'} id={'duree-reference'}>*</Footnote.Reference></b> en fonction de mon
						profil, pour m‘aider à définir mon projet professionnel et à trouver un emploi.
					</p>
					<div id="beneficesCEJ">Quand je signe mon contrat, je bénéficie de :</div>
					<ul aria-labelledby="beneficesCEJ">
						<li>
							<b>Un accompagnement personnalisé avec un conseiller dédié</b> qui me suit tout au long de mon parcours et
							jusqu‘à ce que j‘accède à un emploi durable
						</li>
						<li>
							<b>Un programme intensif</b> d’au minimum 15 à 20 heures par semaine composé de différents types d‘activités
						</li>
						<li>
							<b>Une allocation pouvant aller jusqu‘à 528 euros par mois</b> en fonction de mes ressources et à
							condition que je respecte mes engagements
						</li>
					</ul>
					<Footnote htmlFor={'duree-reference'} id={'note-sur-la-duree'} className={styles.footnoteDuree}>La durée de l‘accompagnement peut exceptionnellement aller jusqu‘à 18 mois</Footnote>
				</article>
			</Container>
		</section>
	);
}
