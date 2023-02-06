import Image from 'next/image';
import React  from 'react';

import styles from '~/client/components/features/MaintenancePoleEmploi/MaintenancePoleEmploi.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

export default function MaintenancePoleEmploi() {
  
	return (
		<Container className={ styles.sectionContainer }>
			<aside className= { styles.sectionContainerIllustration }>
				<Image src="/illustrations/maintenance.svg" width={480} height={480} alt='' aria-hidden />
			</aside>
			<article className={ styles.sectionContainerText}>
				<h1 className={styles.sectionContainerTextTitre}>Le formulaire pour déposer une offre d‘emploi est actuellement en maintenance. Merci de réessayer plus tard.</h1>
				<p>Pour patienter, découvrez l‘ensemble des dispositifs du plan jeune pour les employeurs.</p>
				<Link href="/mesures-employeurs" appearance="asPrimaryButton">Je découvre les dispositifs</Link>
			</article>
		</Container>
	);
}
