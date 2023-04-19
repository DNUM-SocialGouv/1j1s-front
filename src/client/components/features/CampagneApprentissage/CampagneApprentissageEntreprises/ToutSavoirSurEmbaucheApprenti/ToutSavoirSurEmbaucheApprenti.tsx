import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/ToutSavoirSurEmbaucheApprenti/ToutSavoirSurEmbaucheApprenti.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';

import { Link } from '../../../../ui/Link/Link';

export function ToutSavoirSurEmbaucheApprenti() {
	const embaucherUnApprentiLink = 'https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/embaucher-un-apprenti/';

	return (
		<section aria-labelledby={'titre-section-tout-savoir'} className={styles.toutSavoir}>
			<Container className={styles.contenu}>
				<h2 id={'titre-section-tout-savoir'}>
					Tout savoir sur l’embauche d’un apprenti
				</h2>
				<div className={styles.description}>
					Des conseils pour bien recruter votre apprenti, le point sur les aides à l’embauche d’un apprenti… Le site “Embaucher un apprenti” met à disposition un ensemble de conseils pratiques à destination des employeurs
				</div>
				<Link href={embaucherUnApprentiLink} appearance={'asSecondaryButton'}>
					Découvrir les conseils pratiques
				</Link>
			</Container>
		</section>
	);
}
