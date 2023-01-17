import Image from 'next/image';
import illustration from 'public/images/CEJ/benefit-from-it.png';
import React from 'react';

import styles from '~/client/components/features/ContratEngagementJeune/Allocations/Allocations.module.scss';
import SeeMoreMobileOnly from '~/client/components/ui/SeeMore/MobileOnly/SeeMoreMobileOnly';

export default function Allocations() {
	return (
		<section className={ styles.allocations }>
			<div className={ styles.allocationsContainer }>
				<aside className= { styles.allocationsIllustration }>
					<Image src={ illustration } alt='' />
				</aside>
				<article className={ styles.allocationsArticle }>
					<h2 className={ styles.allocationsArticle__Title }>Est-ce que je peux bénéficier de l‘allocation ?</h2>
					<SeeMoreMobileOnly>
						<ConditionsAllocation/>
					</SeeMoreMobileOnly>
				</article>
			</div>
		</section>
	);
}

function ConditionsAllocation() {
	return (
		<>
			<div id="conditionsAllocation" className={styles.conditionAllocation}>
				Je perçois une allocation pouvant aller jusqu’à 500 euros par mois en fonction de :
			</div>
			<ul aria-labelledby="conditionsAllocation">
				<li>
					<b>Mon âge</b>
				</li>
				<li>
					<b>Mes ressources</b>
				</li>
				<li>
					<b>Mon statut</b> (si je suis détaché fiscalement ou si je suis rattaché fiscalement à un foyer aux revenus modestes)
				</li>
				<li>
					<b>Du respect de mes engagements</b>
				</li>
			</ul>
		</>
	);
}
