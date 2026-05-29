import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './EnqueteSatisfactionBanner.module.scss';

const ENQUETE_SATISFACTION_URL = 'https://tally.so/r/J9ePWJ';

export function EnqueteSatisfactionBanner() {
	return (
		<div className={styles.enqueteBanner}>
			<Link href={ENQUETE_SATISFACTION_URL} className={styles.enqueteLink} appearance={'asQuaternaryButton'}>
			Aidez nous à construire l&apos;application mobile de vos rêves 📲
				<Link.Icon />
			</Link>
		</div>
	);
}
