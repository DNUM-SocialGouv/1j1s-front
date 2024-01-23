import React from 'react';

import { EnqueteSatisfactionBanner } from '~/client/components/layouts/Header/Banner/EnqueteSatisfactionBanner';
import styles from '~/client/components/layouts/Header/Header.module.scss';
import { HeaderBody } from '~/client/components/layouts/Header/HeaderBody';
import { HeaderNavDesktop } from '~/client/components/layouts/Header/HeaderNavDesktop';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { Link } from '~/client/components/ui/Link/Link';
import useBreakpoint from '~/client/hooks/useBreakpoint';

const bulletList = '%E2%80%A2';
const lineBreak = '%0D%0A';

const body = `Afin de recevoir des candidatures correspondant au besoin de la mission proposée, nous vous conseillons de bien détailler votre offre, en n'oubliant pas de préciser : 
${lineBreak}
${bulletList}    Un titre pour votre offre de stage ;${lineBreak}
${bulletList}    La description des activités (n'hésitez pas à faire une liste) ;${lineBreak}
${bulletList}    L'adresse du lieu du stage (ville, code postal, département, région, pays) - obligatoire ;${lineBreak}
${bulletList}    Votre secteur d'activité ;${lineBreak}
${bulletList}    Les dates de début et de fin du stage (entre le 17 et 28 juin 2024) ;${lineBreak}
${bulletList}    Les coordonnées et le SIRET de votre entreprise ;${lineBreak}
${bulletList}    Votre identité et coordonnées de la personne à contacter ;${lineBreak}
${bulletList}    L'URL ou le mail pour envoyer sa candidature.${lineBreak}
${lineBreak}
Nous vous recontacterons au plus vite.`;

export const MAILTO_STAGE_3E_2DE = `mailto:contact-1J1S@sg.social.gouv.fr?subject=[Déposer une offre de stage de 3e ou 2de]&body=${body}`;

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
		<Link href={MAILTO_STAGE_3E_2DE} className={styles.headerBannerMobile}>
		  <div className={styles.headerBannerMobileTitle}>Vous voulez accueillir des stagiaires de 3e et 2de&nbsp;?</div>
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
