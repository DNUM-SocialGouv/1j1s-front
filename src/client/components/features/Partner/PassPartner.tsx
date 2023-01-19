import classNames from 'classnames';
import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';

export function PassPartner() {
	return (
		<PartnerCard
			linkLabel="J'accède au site web"
			link="https://www.pass.fonction-publique.gouv.fr/"
			logo="/images/logos/pass.png"
			title="Recherche une offre d'alternance dans la fonction publique"
		>
			<>
				<strong className={classNames(styles.cardHeadline, styles.passColor)}>
					La fonction publique accueille des apprentis dans tous les domaines et
					de tous niveaux.
				</strong>
				Découvrez les offres sur la place de l’apprentissage et des stages.
			</>
		</PartnerCard>
	);
}
