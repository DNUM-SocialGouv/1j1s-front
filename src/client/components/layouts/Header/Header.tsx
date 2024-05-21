import React from 'react';

import { EnqueteSatisfactionBanner } from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { NavDesktop } from '~/client/components/layouts/Header/Navigation/NavDesktop';
import { Link } from '~/client/components/ui/Link/Link';

export const ENCART_CAMPAGNE_URL = 'https://stagedeseconde.1jeune1solution.gouv.fr/professionnels';

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
					Vous souhaitez accueillir des élèves de 2de et contribuer à leur orientation&nbsp;? Faites la différence et déposez facilement une offre de stage.
					<Link.Icon name="angle-right"/>
				</Link> }
			<HeaderBody/>
			<NavDesktop/>
			{displayEnqueteSatisfactionBanner &&
				<EnqueteSatisfactionBanner enqueteUrl={enqueteSatisfactionUrl}/>
			}
		</header>
	);
}
