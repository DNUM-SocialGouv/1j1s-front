import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import { Hero, HeroPrimaryText, HeroSecondaryText } from '~/client/components/ui/Hero/Hero';
import { Link } from '~/client/components/ui/Link/Link';
import useAnalytics from '~/client/hooks/useAnalytics';
import analytics from '~/pages/apprentissage/deposer-offre/index.analytics';
import styles from '~/pages/apprentissage/deposer-offre/index.module.scss';

const SOURCE_LBA_IFRAME = `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}espace-pro/widget/1J1S`;
const POLITIQUE_CONFIDENTIALITÉ_URL = `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}politique-de-confidentialite`;
const CONDITIONS_GÉNÉRALES_UTILISATION_URL = `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}cgu`;
const FORMULAIRE_DEPOT_OFFRE_LBA_URL = `${process.env.NEXT_PUBLIC_LA_BONNE_ALTERNANCE_URL}espace-pro/creation/entreprise/redirec_from_widget_1j1s`;

export default function DeposerOffrePage() {
	useAnalytics(analytics);

	return (
		<main id="contenu">
			<Head
				title="Déposer une offre d‘alternance | 1jeune1solution"
				robots="index,follow"
			/>
			<Hero>
				<h1>
					<HeroPrimaryText className={styles.heroTitle}>
						Je dépose une offre d’alternance sur 1jeune1solution
					</HeroPrimaryText>
				</h1>
				<HeroSecondaryText className={styles.heroSubtitle}>
					En partenariat avec La bonne alternance
				</HeroSecondaryText>
			</Hero>
			<Container className={styles.formulaire}>
				<p className={styles.cadreInformation}>
					Si le formulaire de dépôt d’offre n’est pas visible ci-dessous, cliquez <Link href={FORMULAIRE_DEPOT_OFFRE_LBA_URL} aria-label="Formulaire de dépôt d'offre sur La Bonne Alternance">ici</Link> pour y accéder.

					A noter : si le message suivant apparaît <q>L’adresse email est déjà associée à un compte</q>, nous vous invitons à saisir directement votre email sur la page d’authentification. Vous recevrez alors un message avec le lien de connexion pour déposer votre offre.
				</p>
				<iframe
					className={styles.iframe}
					src={SOURCE_LBA_IFRAME}
					title="Formulaire de dépôt d’offre d’alternance en partenariat avec La bonne alternance"
				/>
				<p className={styles.cadreInformation}>
					Vous êtes informé que vos données sont collectées et traitées par La bonne alternance pour traiter votre
					demande de dépôt d‘offre d’alternace. Pour en savoir plus sur vos droits, consultez la <Link
						href={POLITIQUE_CONFIDENTIALITÉ_URL}>Politique de Confidentialité</Link> de La bonne Alternance.
					En cliquant sur «&nbsp;envoyer ma demande&nbsp;» vous reconnaissez avoir pris connaissance et accepter les <Link
						href={CONDITIONS_GÉNÉRALES_UTILISATION_URL}>Conditions Générales d‘Utilisation</Link> de La bonne alternance.
				</p>
			</Container>
		</main>
	);
}
