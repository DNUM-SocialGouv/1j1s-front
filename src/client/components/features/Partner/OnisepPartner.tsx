import classNames from 'classnames';
import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';

export function OnisepPartner() {
	return (
		<PartnerCard
			linkLabel="Je découvre les métiers"
			link="/decouvrir-les-metiers"
			logo="/images/logos/onisep.svg"
			title="Besoin d‘informations sur les métiers ?"
		>
			<>
				<strong className={classNames(styles.cardHeadline, styles.onisepColor)}>
					Renseignez-vous sur les différents métiers avec l’ONISEP.
				</strong>
				Trouvez un métier qui vous correspond parmi plus de 700 fiches.
			</>
		</PartnerCard>
	);
}
