import classNames from 'classnames';
import React from 'react';

import { PartnerCard } from '~/client/components/features/Partner/Card/PartnerCard';
import styles from '~/client/components/features/Partner/Card/PartnerCard.module.scss';

export function ServiceCiviquePartner() {
	return (
		<PartnerCard
			linkLabel="Je découvre les missions"
			logo="/images/logos/service-civique.svg"
			link="/service-civique"
			title="Le Service Civique, pour acquérir de l’expérience et préparer son avenir"
		>
			<>
				<strong
					className={classNames(
						styles.cardHeadline,
						styles.serviceCiviqueColor,
					)}
				>
					Avec ou sans diplôme, engagez-vous dans des missions d’intérêt général
					en France ou à l’étranger.
				</strong>
				Indemnisé 601€/mois, il vous permettra d’acquérir ou de développer vos
				compétences dans de nombreux domaines. Ouvert aux 16-25 ans (30 ans pour
				les jeunes en situation de handicap).
			</>
		</PartnerCard>
	);
}
