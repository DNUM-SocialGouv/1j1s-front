import React from 'react';

import styles from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner.module.scss';
import { LinkDeprecated } from '~/client/components/ui/LinkDeprecated/LinkDeprecated';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';

interface EnqueteSatisfactionBannerProps {
    enqueteUrl: string;
}

export function EnqueteSatisfactionBanner({ enqueteUrl }: EnqueteSatisfactionBannerProps) {
	return <div className={styles.enqueteBanner}>
		<LinkDeprecated href={enqueteUrl} className={styles.enqueteLink}>
            Vous souhaitez aider 1jeune1solution à s’améliorer ?{' '}
			<TextIcon icon="external-redirection" className={styles.enqueteUrlDeuxiemePhrase}>Donnez votre avis en moins de 2 minutes</TextIcon>
		</LinkDeprecated>
	</div>;
}
