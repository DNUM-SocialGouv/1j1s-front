import React from 'react';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { FormationInitialeDetailCMS } from '~/server/cms/domain/formationInitiale.type';
import { FormationInitiale } from '~/server/formations-initiales/domain/formationInitiale';
import {
	FormationInitialeDetailComplete,
	isFormationWithDetails,
} from '~/server/formations-initiales-detail/domain/formationInitiale';

import styles from './ConsulterDetailFormationInitiale.module.scss';

export function ConsulterDetailFormationInitiale({ formationInitialeDetail }: { formationInitialeDetail: FormationInitialeDetailComplete }) {

	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{formationInitialeDetail.libelle}</h1>
				<TagList list={formationInitialeDetail.tags} className={styles.tags}/>
			</header>
			{isFormationWithDetails(formationInitialeDetail) && <section>
				<dl className={styles.contenu}>
					{formationInitialeDetail.description && (
						<div>
							<dt>Description</dt>
							<dd>{formationInitialeDetail.description}</dd>
						</div>)}
					{formationInitialeDetail.attendusParcoursup && (
						<div>
							<dt>Attendus Parcoursup</dt>
							<dd>{formationInitialeDetail.attendusParcoursup}</dd>
						</div>
					)}
					{formationInitialeDetail.conditionsAcces && (
						<div>
							<dt>Conditions d‘accès</dt>
							<dd>{formationInitialeDetail.conditionsAcces}</dd>
						</div>
					)}
					{formationInitialeDetail.poursuiteEtudes && (
						<div>
							<dt>Poursuite d‘études</dt>
							<dd>{formationInitialeDetail.poursuiteEtudes}</dd>
						</div>
					)}
				</dl>
			</section>}
		</ConsulterOffreLayout>
	);
}
