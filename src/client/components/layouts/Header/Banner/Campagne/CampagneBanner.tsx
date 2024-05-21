import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './CampagneBanner.module.scss';

export const ENCART_CAMPAGNE_URL = 'https://stagedeseconde.1jeune1solution.gouv.fr/professionnels';


export function CampagneBannerMobile() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';
	return (displayCampagneEnCoursBanner &&
		<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerMobile} data-testid="mobile-encart-campagne">
			Vous souhaitez accueillir des élèves de 2de et contribuer à leur orientation&nbsp;? Faites la différence et déposez facilement une offre de stage.
			<Link.Icon name="angle-right"/>
		</Link>
	);
}

export function CampagneBannerDesktop() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';
	return (displayCampagneEnCoursBanner &&
		<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerDektop} data-testid="desktop-encart-campagne">
			<p>
				<span className={styles.title}>
					Vous souhaitez accueillir des élèves de 2de et contribuer à leur orientation&nbsp;?
				</span>
				<span className={styles.content}>Faites la différence et déposez facilement une offre de stage.</span>
			</p>
			<Link.Icon className={styles.icon} name="angle-right"/>
		</Link>
	);
}


