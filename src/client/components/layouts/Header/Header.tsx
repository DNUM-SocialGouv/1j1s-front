import React from 'react';

import { EnqueteSatisfactionBanner } from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Link } from '~/client/components/ui/Link/Link';

export function Header() {
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';

	const enqueteSatisfactionUrl = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL ?? '';
	const displayEnqueteSatisfactionBanner = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE === '1' && !!enqueteSatisfactionUrl;
	const urlDepotOffreStage2de = process.env.NEXT_PUBLIC_DEPOT_STAGES_SECONDE_URL ?? '';

	return (
		<header
			className={styles.header}
			role="banner">
			<Link href={urlDepotOffreStage2de} className={styles.headerBannerMobile} hidden={!displayCampagneEnCoursBanner} data-testid="mobile-mailto-campagne">
				Vous souhaitez accueillir des stagiaires de 2de&nbsp;?
				<Link.Icon name="angle-right"/>
			</Link>
			<HeaderBody/>
			<HeaderNavDesktop/>
			{displayEnqueteSatisfactionBanner &&
				<EnqueteSatisfactionBanner enqueteUrl={enqueteSatisfactionUrl}/>
			}
		</header>
	);
}
