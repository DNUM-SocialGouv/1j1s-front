import React from 'react';

import { EnqueteSatisfactionBanner } from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

const body = `Afin de recevoir des candidatures correspondant au besoin de la mission proposée, nous vous conseillons de bien détailler votre offre, en n'oubliant pas de préciser : 
%0D%0A
%E2%80%A2    Un titre pour votre offre de stage ;%0D%0A
%E2%80%A2    La description des missions (n'hésitez pas à faire une liste) ;%0D%0A 
%E2%80%A2    Le lieu du stage (ville, code postal, département, région, pays) ;%0D%0A
%E2%80%A2    Votre secteur d'activité ;%0D%0A 
%E2%80%A2    Les dates de début et de fin du stage ;%0D%0A 
%E2%80%A2    Les coordonnées et le  SIRET de votre entreprise ;%0D%0A
%E2%80%A2    Vos coordonnées ;%0D%0A
%E2%80%A2    L'URL ou le mail pour envoyer sa candidature.%0D%0A 
%0D%0A
Nous vous recontacterons au plus vite.`;

const MAILTO = `mailto:contact-1J1S@sg.social.gouv.fr?subject=[Déposer une offre de stage de 3ème ou 2nd]&body=${body}`;
export function Header() {
	const { isLargeScreen } = useBreakpoint();
	const displayCampagneEnCoursBanner = process.env.NEXT_PUBLIC_CAMPAGNE_COM_EN_COURS_FEATURE === '1';

	const enqueteSatisfactionUrl = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_URL ?? '';
	const displayEnqueteSatisfactionBanner = process.env.NEXT_PUBLIC_ENQUETE_SATISFACTION_FEATURE === '1' && !!enqueteSatisfactionUrl;

	return (
		<header
			className={styles.header}
			role="banner">
			{!isLargeScreen && displayCampagneEnCoursBanner &&
          <Link href={MAILTO} className={styles.headerBannerMobile}>
          	<div className={styles.headerBannerMobileTitle}>Vous souhaitez recruter des élèves de 3ème et 2nd&nbsp;?</div>
          	<Icon className={styles.headerBannerMobileIcon} name="angle-right"/>
          </Link>
			}
			<HeaderBody/>
			{isLargeScreen && <HeaderNavDesktop/>}
			{displayEnqueteSatisfactionBanner &&
          <EnqueteSatisfactionBanner enqueteUrl={enqueteSatisfactionUrl}/>
			}
		</header>
	);
}
