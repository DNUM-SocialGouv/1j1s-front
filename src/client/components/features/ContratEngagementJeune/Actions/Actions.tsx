import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Actions/Actions.module.scss';
import SeeMoreMobileOnly from '~/client/components/ui/SeeMore/MobileOnly/SeeMoreMobileOnly';

export default function Actions() {
	return (
		<section className={styles.actions}>
			<article className={styles.actionsContainer}>
				<div className={styles.actionsArticle}>
					<h2 className={styles.actionsArticle__Title}>
						Concrètement qu‘est-ce qu‘on fait en Contrat d’Engagement Jeune ?
					</h2>
				</div>
				<div className={styles.actionsArticle__Content}>
					<SeeMoreMobileOnly
						itemList={[<ListeActions key={0}/>]}
						numberOfVisibleItems={0}
						seeLessAriaLabel={'Voir moins d‘actions'}
						seeMoreAriaLabel={'Voir plus d‘actions'}>
						<ListeActions />
					</SeeMoreMobileOnly>
				</div>
			</article>
		</section>
	);
}

function ListeActions() {
	return (
		<div>
			<p>
				Accueilli au sein de Pôle emploi ou de ma Mission Locale, en fonction de mon profil, de mes compétences et de
				mes envies, je pourrai avoir accès à :
			</p>
			<ul>
				<li>
					<b>Des points réguliers en tête-à-tête avec mon conseiller</b> qui me suit tout au long de mon parcours et
					jusqu‘à ce que j‘accède à un emploi durable
				</li>
				<li>
					<b>Des ateliers collectifs avec d‘autres jeunes</b> pour partager nos expériences
				</li>
				<li>
					<b>Des stages et immersions en entreprise</b> pour découvrir différents métiers
				</li>
				<li>
					<b>Toutes les solutions du plan 1 jeune, 1 solution :</b> formations qualifiantes, service civique, prépa
					apprentissage, école de la 2ème chance (E2C), Epide, etc.
				</li>
				<li>
					<b>Une appli pour suivre l‘évolution de mon parcours</b> et tenir mes engagements
				</li>
			</ul>
		</div>
	);
}
