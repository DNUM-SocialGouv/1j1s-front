import React from 'react';

import styles
	from '~/client/components/features/CampagneApprentissage/CampagneApprentissageEntreprises/NewInformationSurEmbaucheApprenti/NewInformationSurEmbaucheApprenti.module.scss';
import { Container } from '~/client/components/layouts/Container/Container';
import { Link } from '~/client/components/ui/Link/Link';

export function NewInformationSurEmbaucheApprenti() {

	return (
		<Container className={styles.informationSurEmbauche}>
			<section aria-labelledby={'titre-section-aide'} className={styles.aideFinanciere}>
				<hgroup>
					<h2 id={'titre-section-aide'}>
					Vous voulez en savoir plus sur l’apprentissage ?
					</h2>
					<p>Nous avons toutes les réponses à vos questions !</p>
				</hgroup>
				<Link href={'/faq/apprentissage-employeurs-apprentis'} appearance={'asPrimaryButton'} className={styles.link}>
						Consultez notre FAQ
					<Link.Icon />
				</Link>
			</section>
		</Container>
	);
}
