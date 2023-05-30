import React from 'react';

import { EnqueteSatisfactionBanner } from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Header() {
	const { isLargeScreen } = useBreakpoint();
	const displayCampagneApprentissageBanner = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';

	const enqueteSatisfactionUrl = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL ?? '';
	const displayEnqueteSatisfactionBanner = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE === '1' && !!enqueteSatisfactionUrl;

	return (
		<header
			className={styles.header}
			role="banner">
			{!isLargeScreen && displayCampagneApprentissageBanner &&
          <Link href="/choisir-apprentissage" className={styles.headerBannerMobile}>
          	<div className={styles.headerBannerMobileTitle}>L’apprentissage, c’est le bon choix !</div>
          	<Icon className={styles.headerBannerMobileIcon} name="angle-right"/>
          </Link>
			}
			<HeaderBody />
			{ isLargeScreen && <HeaderNavDesktop />}
			{ displayEnqueteSatisfactionBanner &&
				<EnqueteSatisfactionBanner enqueteUrl={enqueteSatisfactionUrl}/>
			}
		</header>
	);
}
