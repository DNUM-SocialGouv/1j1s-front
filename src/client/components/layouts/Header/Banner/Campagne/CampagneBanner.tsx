import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './CampagneBanner.module.scss';


const isCampagneJeuneActive = process.env.NEXT_PUBLIC_STAGES_SECONDE_RECHERCHE_JEUNE_FEATURE === '1';

const ENCART_CAMPAGNE_URL = process.env.NEXT_PUBLIC_STAGES_SECONDE_URL ?? '';
const TITRE = 'Proposer un stage' + (isCampagneJeuneActive ? ' ou candidater !' : ' !');
const SOUS_TITRE = 'Du 16 au 27 juin pour permettre aux élèves de seconde générale et technologique de diversifier leur connaissance des métiers.';

export function CampagneBannerMobile() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';
	return (displayCampagneEnCoursBanner && (
		<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerMobile} data-testid="mobile-encart-campagne">
			{TITRE} {/*SOUS_TITRE*/}
			<Link.Icon name="angle-right" />
		</Link>
	)
	);
}

export function CampagneBannerDesktop() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';
	return (displayCampagneEnCoursBanner && (
		<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerDektop} data-testid="desktop-encart-campagne">
			<p>
				<span className={styles.title}>{TITRE}</span>
				<span className={styles.content}>{SOUS_TITRE}</span>
			</p>
			<Link.Icon className={styles.icon} name="angle-right" />
		</Link>
	)
	);
}


