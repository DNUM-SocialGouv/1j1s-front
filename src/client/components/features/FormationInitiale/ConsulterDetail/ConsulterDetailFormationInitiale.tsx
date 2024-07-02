import React from 'react';

import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { Link } from '~/client/components/ui/Link/Link';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import {
	FormationInitialeDetailAvecInformationsComplementaires,
	isFormationWithComplementaryInformation,
} from '~/server/formations-initiales/domain/formationInitiale';

import styles from './ConsulterDetailFormationInitiale.module.scss';

export function ConsulterDetailFormationInitiale({ formationInitialeDetail }: {
	formationInitialeDetail: FormationInitialeDetailAvecInformationsComplementaires
}) {
	const isFormationInitialeWithCMSDetails = isFormationWithComplementaryInformation(formationInitialeDetail);

	const descriptionDirty = isFormationInitialeWithCMSDetails ? formationInitialeDetail.description : undefined;
	const attendusParcoursupDirty = isFormationInitialeWithCMSDetails ? formationInitialeDetail.attendusParcoursup : undefined;
	const conditionsAccesDirty = isFormationInitialeWithCMSDetails ? formationInitialeDetail.conditionsAcces : undefined;
	const poursuiteEtudesDirty = isFormationInitialeWithCMSDetails ? formationInitialeDetail.poursuiteEtudes : undefined;

	const descriptionSanitized = useSanitize(descriptionDirty);
	const attendusParcoursupSanitized = useSanitize(attendusParcoursupDirty);
	const conditionsAccesSanitized = useSanitize(conditionsAccesDirty);
	const poursuiteEtudesSanitized = useSanitize(poursuiteEtudesDirty);

	function getTags() {
		const tags = [];
		if (formationInitialeDetail.isCertifiante) tags.push('Certifiante');
		if (formationInitialeDetail.niveauDeSortie) tags.push(formationInitialeDetail.niveauDeSortie);
		if (formationInitialeDetail.duree) tags.push(formationInitialeDetail.duree);
		return tags;
	}

	return (
		<ConsulterOffreLayout>
			<header className={styles.entete}>
				<h1>{formationInitialeDetail.libelle}</h1>
				<TagList list={getTags()} className={styles.tags}/>
			</header>

			<Link href={formationInitialeDetail.url_formation} appearance="asPrimaryButton">
				Consulter les établissements
				<Link.Icon/>
			</Link>

			{isFormationInitialeWithCMSDetails && <section>
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
			{!isFormationInitialeWithCMSDetails && (
				<p className={styles.mentionFormationNonDocumentee}>L‘ONISEP ne fournit pas de description pour cette formation.
					Vous pouvez consulter les établissements pour plus d‘informations.</p>
			)}
		</ConsulterOffreLayout>
	);
}
