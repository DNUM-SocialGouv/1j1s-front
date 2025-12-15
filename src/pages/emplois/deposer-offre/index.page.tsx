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
import {Link} from "~/client/components/ui/Link/Link";

const POLITIQUE_DE_CONFIDENTIALITÉ_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/politique-de-confidentialite';
const CONDITIONS_GÉNÉRALES_UTILISATION_URL = 'https://immersion-facile-1.gitbook.io/mentions-legales/conditions-generales-dutilisation';

export default function DéposerUneOffreDEmploi() {
	useAnalytics(analytics);

	return (
		<main id="contenu">
			<Head
				title="Déposer une offre d‘emploi ou d‘alternance | 1jeune1solution"
				robots="index,follow" />
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
				<p>Afin de renforcer la sécurisation de vos données et de faciliter le dépôt de vos offres d’emploi, rendez-vous
					sur : <Link href={'https://pro.francetravail.fr/depotoffrerecruteur/accueil'} target={'_blank'}>francetravail.fr</Link>.<br /><br />

					Votre numéro de SIRET vous sera demandé afin d’être identifié automatiquement par France Travail.
					Les informations ne seront pas modifiables.
					Si vous ne disposez pas de SIRET, contactez le 39 95 (Numéro gris ou banalisé : coût d&#39;un appel vers un
					fixe et service gratuit, depuis un téléphone fixe ou mobile). Depuis l&#39;étranger (entreprises frontalières
					par exemple), composez le +33 1 77 86 39 95.<br /><br />

					Pour rappel, le numéro unique 3995 vous permet d’échanger avec un conseiller du lundi au samedi inclus, de
					7h30 à 20h, avec un système de demande de rappel en cas d’indisponibilité.
				</p>
				<br />
				<p className={styles.rgpd}>
					Vous êtes informé que vos données sont collectées et traitées par France Travail pour traiter votre demande de
					dépôt d‘offre. Pour en savoir plus sur vos droits, consultez la <a href={POLITIQUE_DE_CONFIDENTIALITÉ_URL}>Politique
					de Confidentialité</a> de France Travail. En cliquant sur «&nbsp;confirmer&nbsp;» vous reconnaissez avoir pris
					connaissance
					et accepter les <a href={CONDITIONS_GÉNÉRALES_UTILISATION_URL}>Conditions Générales d‘Utilisation</a> de France Travail.
				</p>
			</Container>
		</main>
	);
}

