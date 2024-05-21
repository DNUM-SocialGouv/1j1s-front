import React from 'react';

import { CampagneBannerMobile } from '~/client/components/layouts/Header/Banner/Campagne/CampagneBanner';
import {
	EnqueteSatisfactionBanner,
} from '~/client/components/layouts/Header/Banner/EnqueteSatisfaction/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { NavDesktop } from '~/client/components/layouts/Header/Navigation/NavDesktop';

export function Header() {

	const enqueteSatisfactionUrl = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL ?? '';
	const displayEnqueteSatisfactionBanner = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE === '1' && !!enqueteSatisfactionUrl;

	return (
		<header className={styles.header} role="banner">
			<CampagneBannerMobile/>
			<HeaderBody/>
			<NavDesktop/>
			{displayEnqueteSatisfactionBanner &&
				<EnqueteSatisfactionBanner enqueteUrl={enqueteSatisfactionUrl}/>
			}
		</header>
	);
}
