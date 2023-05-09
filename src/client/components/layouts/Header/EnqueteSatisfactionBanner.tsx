import React from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

interface EnqueteSatisfactionBannerProps {
	enqueteUrl: string;
}
export function EnqueteSatisfactionBanner({ enqueteUrl }: EnqueteSatisfactionBannerProps) {
	return <div className={styles.enqueteBanner}>
		<Link href={enqueteUrl} className={styles.enqueteLink}>
            Vous souhaitez aider 1jeune1solution à s’améliorer ?{' '}
			<TextIcon icon="external-redirection">Donnez votre avis en moins de 5 minutes</TextIcon>
		</Link>
	</div>;
}
