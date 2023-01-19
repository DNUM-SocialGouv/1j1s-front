import classNames from 'classnames';
import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';

export function LaBonneAlternancePartner() {
	return (
		<PartnerCard
			linkLabel="J’accède au site web"
			link="https://labonnealternance.apprentissage.beta.gouv.fr/"
			logo="/images/logos/la-bonne-alternance.svg"
			title="Étendez votre recherche à LaBonneAlternance"
		>
			<>
				<strong
					className={classNames(
						styles.cardHeadline,
						styles.bonneAlternanceColor,
					)}
				>
					Vous ne trouvez pas de contrat ou d’offres d’alternance ?
				</strong>
				Essayez La bonne alternance !
			</>
		</PartnerCard>
	);
}
