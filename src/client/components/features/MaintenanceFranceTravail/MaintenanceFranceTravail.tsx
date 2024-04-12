import React from 'react';

import styles from '~/client/components/features/MaintenanceFranceTravail/MaintenanceFranceTravail.module.scss';
import { Image } from '~/client/components/ui/Img';
import { Link } from '~/client/components/ui/Link/Link';

export default function MaintenanceFranceTravail() {

	return (
		<div className={styles.container}>
			<Image src="/illustrations/maintenance.svg" width={480} height={480} alt=""/>
			<div className={styles.containerText}>
				<h1 className={styles.containerTextTitle}>Le formulaire pour déposer une offre d’emploi est actuellement en
					maintenance. Merci de réessayer plus tard.</h1>
				<p>Pour patienter, découvrez l‘ensemble des dispositifs du plan jeune pour les employeurs.</p>
				<Link href="/mesures-employeurs" appearance="asPrimaryButton">Je découvre les dispositifs<Link.Icon/></Link>
			</div>
		</div>
	);
}
