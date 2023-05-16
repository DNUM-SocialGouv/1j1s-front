import React from 'react';

import styles from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/InformationSurEmbaucheApprenti/InformationSurEmbaucheApprenti.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';



export function InformationSurEmbaucheApprenti() {
	const embaucherUnApprentiLink = 'https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/embaucher-un-apprenti/';
	const enSavoirPlusSurAideLink = 'https://travail-emploi.gouv.fr/formation-professionnelle/entreprise-et-alternance/aides-au-recrutement-d-un-alternant/article/aide-2023-aux-employeurs-qui-recrutent-en-alternance';

	return (
		<Container className={styles.informationSurEmbauche}>
			<section aria-labelledby={'titre-section-renseignement'} className={styles.renseignement}>
				<h2 id={'titre-section-renseignement'}>
					Comme eux, vous souhaitez faire le choix de l’apprentissage ?
				</h2>
				<Link href={embaucherUnApprentiLink} appearance={'asSecondaryButton'} className={styles.link}>
					Se renseigner sur l’embauche
				</Link>
			</section>
			<section aria-labelledby={'titre-section-aide'} className={styles.aideFinanciere}>
				<h2 id={'titre-section-aide'}>
						Vous envisagez de recruter un apprenti ? Vous pouvez bénéficier d’une aide financière
				</h2>
				<p className={styles.description}>
						Cette aide de 6000 euros maximum est versée pour la première année de contrat, jusqu’au niveau master
				</p>
				<Link href={enSavoirPlusSurAideLink} appearance={'asSecondaryButton'} className={styles.link}>
						En savoir plus
				</Link>
			</section>
		</Container>
	);
}
