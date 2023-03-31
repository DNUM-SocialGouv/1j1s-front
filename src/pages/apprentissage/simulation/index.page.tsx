import { NextRouter, useRouter } from 'next/router';
import React from 'react';

import { Head } from '~/client/components/head/Head';
import { Container } from '~/client/components/layouts/Container/Container';
import {
	Hero,
	HeroPrimaryText,
	HeroSecondaryText } from '~/client/components/ui/Hero/Hero';
import styles from '~/pages/apprentissage/simulation/index.module.scss';

const POLITIQUE_DE_CONFIDENTIALITÉ_URL = 'https://www.alternance.emploi.gouv.fr/politique-de-confidentialite';

export enum TYPE_SIMULATEUR {
	ALTERNANT = 'alternant',
	EMPLOYEUR = 'employeur',
}

export default function SimulateurOffreAlternant() {
	const router = useRouter();
	const typeSimulateur = getTypeSimulateur(router);
	const iframeSrc = `https://simulateur-alternance.1jeune1solution.gouv.fr/simulateur-${typeSimulateur}/etape-1?widget=true`;
	const titre = getTitre(typeSimulateur);

	return (
		<main id="contenu">
			<Head
				title={`${titre} | 1jeune1solution`}
				robots="index,follow"
			/>
			<Hero>
				<h1><HeroPrimaryText className={styles.heroTitle}>{titre}</HeroPrimaryText></h1>
				<HeroSecondaryText className={styles.heroSubtitle}>
					En partenariat avec le Portail de l’Alternance
				</HeroSecondaryText>
			</Hero>
			<Container>
				<iframe className={styles.iframe}
					title="Formulaire de simulation de la rémunération en apprentissage de la Délégation générale à l’emploi et à la formation professionnelle"
					src={iframeSrc}/>
				<p className={styles.rgpd}>
					Vous êtes informé que vos données sont collectées et traitées par la <abbr title="Délégation Générale À l’Emploi et à la Formation Professionnelle">DGEFP</abbr> pour traiter votre demande.
					En cliquant sur « Commencer la simulation » vous reconnaissez avoir pris connaissance et accepté la <a href={POLITIQUE_DE_CONFIDENTIALITÉ_URL}>Politique de Confidentialité de la DGEFP</a>.
				</p>
			</Container>
		</main>
	);
}

const getTypeSimulateur = (router: NextRouter): TYPE_SIMULATEUR => {
	const typeSimulateurFromUrl = router.query.simulateur ?? TYPE_SIMULATEUR.EMPLOYEUR;

	if (typeSimulateurFromUrl === TYPE_SIMULATEUR.ALTERNANT) {
		return TYPE_SIMULATEUR.ALTERNANT;
	} else {
		return TYPE_SIMULATEUR.EMPLOYEUR;
	}
};

const getTitre = (typeSimulateur: TYPE_SIMULATEUR) => {
	if (typeSimulateur == TYPE_SIMULATEUR.ALTERNANT) {
		return 'Je simule ma rémunération en tant qu’apprenti';
	} else {
		return 'Je simule le coût d’embauche de mon futur apprenti';
	}
};



