import Image from 'next/image';
import React  from 'react';

import styles from '~/client/components/features/MaintenancePoleEmploi/MaintenancePoleEmploi.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export default function MaintenancePoleEmploi() {
	const { isSmallScreen } = useBreakpoint();

	return (
		<div className={ styles.container }>
			{ !isSmallScreen && <Image src="/illustrations/maintenance.svg" width={480} height={480} alt='' /> }
			<div className={ styles.containerText}>
				<h1 className={styles.containerTextTitre}>Le formulaire pour déposer une offre d’emploi est actuellement en maintenance. Merci de réessayer plus tard.</h1>
				<p>Pour patienter, découvrez l‘ensemble des dispositifs du plan jeune pour les employeurs.</p>
				<Link href="/mesures-employeurs" appearance="asPrimaryButton">Je découvre les dispositifs</Link>
			</div>
		</div>
	);
}
