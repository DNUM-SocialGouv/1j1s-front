import React from 'react';

import { EnqueteSatisfactionBanner } from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Link } from '~/client/components/ui/Link/Link';

export const ENCART_CAMPAGNE_URL = 'https://forms.sbc33.com/62553f47462f0e1887f81bfe/VQ35E9J0QhCSCxvF8H-mVA/form.html';

export function Header() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';

	const enqueteSatisfactionUrl = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL ?? '';
	const displayEnqueteSatisfactionBanner = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE === '1' && !!enqueteSatisfactionUrl;

	return (
		<header
			className={styles.header}
			role="banner">
			{ displayCampagneEnCoursBanner &&
				<Link href={ENCART_CAMPAGNE_URL} className={styles.headerBannerMobile} data-testid="mobile-encart-campagne">
					Vous êtes en 2de générale ou technologique et vous cherchez un stage&nbsp;? L’ouverture du service est prévue le 25 mars
					<Link.Icon name="angle-right"/>
				</Link> }
			<HeaderBody/>
			<HeaderNavDesktop/>
			{displayEnqueteSatisfactionBanner &&
				<EnqueteSatisfactionBanner enqueteUrl={enqueteSatisfactionUrl}/>
			}
		</header>
	);
}
