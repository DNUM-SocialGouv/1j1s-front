import React from 'react';

import { Link } from '~/client/components/ui/Link/Link';

import styles from './EnqueteSatisfactionBanner.module.scss';

interface EnqueteSatisfactionBannerProps {
	enqueteUrl: string;
}

export function EnqueteSatisfactionBanner({ enqueteUrl }: EnqueteSatisfactionBannerProps) {
	return (
		<div className={styles.enqueteBanner}>
			<Link href={enqueteUrl} className={styles.enqueteLink} appearance={'asQuaternaryButton'}>
			Vous souhaitez aider 1jeune1solution à s’améliorer ? Donnez votre avis en moins de 2 minutes
				<Link.Icon />
			</Link>
		</div>
	);
}
