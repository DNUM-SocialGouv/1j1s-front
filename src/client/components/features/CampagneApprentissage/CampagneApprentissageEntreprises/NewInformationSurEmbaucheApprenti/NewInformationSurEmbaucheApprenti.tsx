import React from 'react';

import styles
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/NewInformationSurEmbaucheApprenti/NewInformationSurEmbaucheApprenti.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

export function NewInformationSurEmbaucheApprenti() {

	return (
		<Container className={styles.informationSurEmbauche}>
			<section aria-labelledby={'titre-section-aide'} className={styles.aideFinanciere}>
				<h2 id={'titre-section-aide'}>
					Vous souhaitez en savoir plus sur l’apprentissage ?
				</h2>
				<Link href={'/faq/apprentissage-employeurs-apprentis'} appearance={'asPrimaryButton'} className={styles.link}>
						Découvrez la FAQ
					<Link.Icon />
				</Link>
			</section>
		</Container>
	);
}
