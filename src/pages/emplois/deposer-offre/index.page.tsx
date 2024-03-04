import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import {
	Hero,
	HeroPrimaryText,
	HeroSecondaryText,
} from '~/client/components/ui/Hero/Hero';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/emplois/deposer-offre/index.analytics';
import styles from '~/pages/emplois/deposer-offre/index.module.scss';

const POLITIQUE_DE_CONFIDENTIALITÉ_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/politique-de-confidentialite';
const CONDITIONS_GÉNÉRALES_UTILISATION_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/conditions-generales-dutilisation';

export default function DéposerUneOffreDEmploi() {
	useAnalytics(analytics);

	return (
		<main id="contenu">
			<Head
				title="Déposer une offre d‘emploi ou d‘alternance | 1jeune1solution"
				robots="index,follow"
			/>
			<Hero>
				<h1>
					<HeroPrimaryText className={styles.heroTitle}>
						Je dépose une offre d‘emploi ou d‘alternance sur 1jeune1solution
					</HeroPrimaryText>
				</h1>
				<HeroSecondaryText className={styles.heroSubtitle}>
					En partenariat avec France Travail
				</HeroSecondaryText>
			</Hero>
			<Container>
				<iframe
					className={styles.iframe}
					src="https://deposer-offre.www.1jeune1solution.gouv.fr/#/deposer-offre"
					title="Formulaire de dépôt d‘offre d‘emploi ou d‘alternance en partenariat avec France Travail"
				/>
				<p className={styles.rgpd}>
					Vous êtes informé que vos données sont collectées et traitées par France Travail pour traiter votre demande de
					dépôt d‘offre. Pour en savoir plus sur vos droits, consultez la <a href={POLITIQUE_DE_CONFIDENTIALITÉ_URL}>Politique
					de Confidentialité</a> de France Travail. En cliquant sur «&nbsp;confirmer&nbsp;» vous reconnaissez avoir pris
					connaissance
					et accepter les <a href={CONDITIONS_GÉNÉRALES_UTILISATION_URL}>Conditions Générales d‘Utilisation</a> de Pôle
					Emploi.
				</p>
			</Container>
		</main>
	);
}

