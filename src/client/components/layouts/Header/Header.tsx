import React from 'react';

import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import { TextIcon } from '~/client/components/ui/TextIcon/TextIcon';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function Header() {
	const { isLargeScreen } = useBreakpoint();
	const displayBanner = process.env.NEXT_PUBLIC_CAMPAGNE_APPRENTISSAGE_FEATURE === '1';

	const enqueteSatisfactionUrl = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL ?? '';
	const displayEnqueteSatisfaction = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE === '1' && !!enqueteSatisfactionUrl;

	return (
		<header
			className={styles.header}
			role="banner">
			{ !isLargeScreen && displayBanner &&
				<Link href="/apprentissage" className={styles.headerBannerMobile}>
				  <div className={styles.headerBannerMobileTitle}>L’apprentissage, c’est le bon choix !</div>
				  <Icon className={styles.headerBannerMobileIcon} name='angle-right' />
				</Link>
			}
			<HeaderBody />
			{ isLargeScreen && <HeaderNavDesktop />}
			{ displayEnqueteSatisfaction &&
				<div className={styles.enqueteBanner}>
					<Link href={ enqueteSatisfactionUrl } className={styles.enqueteLink}>
						Vous souhaitez aider 1jeune1solution à s’améliorer ?{' '}
						<TextIcon icon="external-redirection">Donnez votre avis en moins de 5 minutes</TextIcon>
					</Link>
				</div>
			}
		</header>
	);
}
