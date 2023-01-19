import classNames from 'classnames';
import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';

export function LaBonneBoitePartner() {
	return (
		<PartnerCard
			linkLabel="J’accède au site web"
			logo="/images/logos/la-bonne-boite.svg"
			link="https://labonneboite.pole-emploi.fr/"
			title="Et si vous contactiez directement les entreprises ?"
		>
			<>
				<strong
					className={classNames(styles.cardHeadline, styles.bonneBoiteColor)}
				>
					N’envoyez plus vos CV au hasard !
				</strong>
				Identifiez et contactez les entreprises qui peuvent être susceptibles de
				recruter même si elles n’ont pas déposé d’offres. Nos outils détectent
				les entreprises qui vont probablement embaucher dans les 6 prochains
				mois.
			</>
		</PartnerCard>
	);
}
