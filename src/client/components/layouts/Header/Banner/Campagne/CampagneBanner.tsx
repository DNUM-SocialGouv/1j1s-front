import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './CampagneBanner.module.scss';

export const ENCART_CAMPAGNE_URL = 'https://www.1jeune1solution.gouv.fr/articles/competition-mondiale-des-metiers-world-skills-lyon-2024';
const TITRE = 'Retrouvez le programme de la 47e édition des WorldSkills Lyon 2024';
//const SOUS_TITRE = 'Faites la différence et déposez facilement une offre de stage.';

export function CampagneBannerMobile() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';
	return (displayCampagneEnCoursBanner &&
		<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerMobile} data-testid="mobile-encart-campagne">
			{TITRE} {/*SOUS_TITRE*/}
			<Link.Icon name="angle-right"/>
		</Link>
	);
}

export function CampagneBannerDesktop() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';
	return (displayCampagneEnCoursBanner &&
		<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerDektop} data-testid="desktop-encart-campagne">
			<p>
				<span className={styles.title}>{TITRE}</span>
				{/*<span className={styles.content}>{SOUS_TITRE}</span>*/}
			</p>
			<Link.Icon className={styles.icon} name="angle-right"/>
		</Link>
	);
}


