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
				<iframe
					className={styles.iframe}
					src={SOURCE_LBA_IFRAME}
					title="Formulaire de dépôt d’offre d’alternance en partenariat avec La bonne alternance"
				/>
				<p className={styles.rgpd}>
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
