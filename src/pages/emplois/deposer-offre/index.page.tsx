import React from 'react';

import { HeadTag } from '~/client/components/head/HeaderTag';
import { Container } from '~/client/components/layouts/Container/Container';
import { Hero,HeroPrimaryText, HeroSecondaryText } from '~/client/components/ui/Hero/Hero';

import styles from './index.module.scss';

const POLITIQUE_DE_CONFIDENTIALITÉ_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/politique-de-confidentialite';
const CONDITIONS_GÉNÉRALES_UTILISATION_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/conditions-generales-dutilisation';

export default function DéposerUneOffreDEmploi() {
	return (
		<main id="contenu">
			<HeadTag title="Déposer une offre d‘emploi ou d‘alternance | 1jeune1solution"/>
			<Hero>
				<h1><HeroPrimaryText className={styles.heroTitle}>Déposez votre offre d‘emploi ou d‘alternance sur 1jeune1solution</HeroPrimaryText></h1>
				<HeroSecondaryText className={styles.heroSubtitle}>
					En partenariat avec Pôle Emploi
				</HeroSecondaryText>
			</Hero>
			<Container className={styles.section}>
				<iframe
					className={styles.iframe}
					src="https://deposer-offre.www.1jeune1solution.gouv.fr/#/deposer-offre"
					title="Formulaire de dépôt d‘offre d‘emploi ou d‘alternance en partenariat avec Pôle Emploi"
				/>
				<p className={styles.rgpd}>
          Vous êtes informé que vos données sont collectées et traitées par Pôle emploi pour traiter votre demande de
          dépôt d‘offre. Pour en savoir plus sur vos droits, consultez la <a href={POLITIQUE_DE_CONFIDENTIALITÉ_URL}>Politique
          de Confidentialité</a> de Pôle emploi. En cliquant sur «&nbsp;confirmer&nbsp;» vous reconnaissez avoir pris connaissance
          et accepter les <a href={CONDITIONS_GÉNÉRALES_UTILISATION_URL}>Conditions Générales d‘Utilisation</a> de Pôle
          Emploi.
				</p>
			</Container>
		</main>
	);
}

