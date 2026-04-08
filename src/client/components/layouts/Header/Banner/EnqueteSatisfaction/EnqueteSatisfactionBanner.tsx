import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './EnqueteSatisfactionBanner.module.scss';

const ENQUETE_SATISFACTION_URL = 'https://jedonnemonavis.numerique.gouv.fr/Demarches/4085?button=4514';

export function EnqueteSatisfactionBanner() {
	return (
		<div className={styles.enqueteBanner}>
			<Link href={ENQUETE_SATISFACTION_URL} className={styles.enqueteLink} appearance={'asQuaternaryButton'}>
			Vous souhaitez aider 1jeune1solution à s&apos;améliorer ? Donnez votre avis en moins de 2 minutes
				<Link.Icon />
			</Link>
		</div>
	);
}
