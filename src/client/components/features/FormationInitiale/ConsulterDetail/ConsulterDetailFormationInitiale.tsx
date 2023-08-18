import React from 'react';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import {
	FormationInitialeDetailComplete,
	isFormationWithDetails,
} from '~/server/formations-initiales-detail/domain/formationInitiale';

import styles from './ConsulterDetailFormationInitiale.module.scss';

export function ConsulterDetailFormationInitiale({ formationInitialeDetail }: { formationInitialeDetail: FormationInitialeDetailComplete }) {
	const descriptionSanitized = useSanitize(isFormationWithDetails(formationInitialeDetail) ? formationInitialeDetail.description : undefined);
	const attendusParcoursupSanitized = useSanitize(isFormationWithDetails(formationInitialeDetail) ? formationInitialeDetail.attendusParcoursup : undefined);
	const conditionsAccesSanitized = useSanitize(isFormationWithDetails(formationInitialeDetail) ? formationInitialeDetail.conditionsAcces : undefined);
	const poursuiteEtudesSanitized = useSanitize(isFormationWithDetails(formationInitialeDetail) ? formationInitialeDetail.poursuiteEtudes : undefined);

	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{formationInitialeDetail.libelle}</h1>
				<TagList list={formationInitialeDetail.tags} className={styles.tags}/>
			</header>

			<LinkStyledAsButton href={formationInitialeDetail.url_formation} appearance="asPrimaryButton">
				Consulter les établissements
			</LinkStyledAsButton>

			{isFormationWithDetails(formationInitialeDetail) && <section>
				<dl className={styles.contenu}>
					{formationInitialeDetail.description && (
						<div>
							<dt>Description</dt>
							<dd dangerouslySetInnerHTML={{ __html: descriptionSanitized }}/>
						</div>)}
					{formationInitialeDetail.attendusParcoursup && (
						<div>
							<dt>Attendus Parcoursup</dt>
							<dd dangerouslySetInnerHTML={{ __html: attendusParcoursupSanitized }}/>
						</div>
					)}
					{formationInitialeDetail.conditionsAcces && (
						<div>
							<dt>Conditions d‘accès</dt>
							<dd dangerouslySetInnerHTML={{ __html: conditionsAccesSanitized }}/>
						</div>
					)}
					{formationInitialeDetail.poursuiteEtudes && (
						<div>
							<dt>Poursuite d‘études</dt>
							<dd dangerouslySetInnerHTML={{ __html: poursuiteEtudesSanitized }}/>
						</div>
					)}
				</dl>
			</section>}
		</ConsulterOffreLayout>
	);
}
