import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/InformationSurEmbaucheApprenti/InformationSurEmbaucheApprenti.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';



export function InformationSurEmbaucheApprenti() {
	const embaucherUnApprentiLink = 'https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/embaucher-un-apprenti/';

	return (
		<section aria-labelledby={'titre-section-tout-savoir'} className={styles.toutSavoir}>
			<Container className={styles.contenu}>
				<h2 id={'titre-section-tout-savoir'}>
					Comme eux, vous souhaitez faire le choix de l’apprentissage ?
				</h2>
				<Link href={embaucherUnApprentiLink} appearance={'asSecondaryButton'}>
					Se renseigner sur l’embauche
				</Link>
			</Container>
		</section>
	);
}
