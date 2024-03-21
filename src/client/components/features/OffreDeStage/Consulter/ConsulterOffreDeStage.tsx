import React, { useCallback, useMemo } from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { dureeCategorisee } from '~/client/components/features/OffreDeStage/Consulter/getDureeCategorisee';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { Link } from '~/client/components/ui/Link/Link';
import { getHtmlFromMd } from '~/client/components/ui/MarkdownToHtml/getHtmlFromMd';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { RemunerationPeriode } from '~/server/stages/domain/remunerationPeriode';
import { OffreDeStage } from '~/server/stages/domain/stages';
import { DomainesStage } from '~/server/stages/repository/domainesStage';

interface ConsulterOffreDeStageProps {
	offreDeStage: OffreDeStage
}

const mapPeriodePaiementLabel = (remunerationPeriode?: RemunerationPeriode) => {
	switch (remunerationPeriode) {
		case RemunerationPeriode.HOURLY:
			return 'Par heure';
		case RemunerationPeriode.MONTHLY:
			return 'Par mois';
		case RemunerationPeriode.YEARLY:
			return 'Par an';
		default:
			return 'Par mois';
	}
};

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {
	const listeEtiquettes = useMemo(() => {
		const domainesWithoutNonRenseigne = offreDeStage.domaines
			? offreDeStage.domaines
				.filter((domaine) => domaine !== DomainesStage.NON_RENSEIGNE)
			: [];

		const localisation = offreDeStage.localisation?.ville || offreDeStage.localisation?.departement || offreDeStage.localisation?.region;
		const tags: Array<string> = [
			...domainesWithoutNonRenseigne,
		];
		if (localisation) {
			tags.push(localisation);
		}
		tags.push(dureeCategorisee(offreDeStage.dureeEnJour || 0));
		if (offreDeStage.dateDeDebutMin) {
			tags.push(
				offreDeStage.dateDeDebutMax && offreDeStage.dateDeDebutMin !== offreDeStage.dateDeDebutMax
					? `Débute entre le : ${new Date(offreDeStage.dateDeDebutMin).toLocaleDateString()} et ${new Date(offreDeStage.dateDeDebutMax).toLocaleDateString()}`
					: `Débute le : ${new Date(offreDeStage.dateDeDebutMin).toLocaleDateString()}`,
			);
		}
		return tags;
	}, [offreDeStage]);

	const descriptionEmployeurHtmlSanitiezd = useSanitize(offreDeStage.employeur?.description && getHtmlFromMd(offreDeStage.employeur.description));
	const descriptionHtmlSanitized = useSanitize(getHtmlFromMd(offreDeStage.description));

	const remuneration = useCallback(function getRemunerationOffreDeStage() {
		if (offreDeStage.remunerationBase === undefined && offreDeStage.remunerationMin === undefined && offreDeStage.remunerationMax === undefined) {
			return 'Non renseignée';
		}
		if (offreDeStage.remunerationBase) { // supprimer ce if lors du ticket UNJ1S-1964
			return offreDeStage.remunerationBase > 0 ? `${offreDeStage.remunerationBase?.toString()} €` : 'Aucune';
		}
		if (offreDeStage.remunerationMax && offreDeStage.remunerationMax > 0) {
			return `entre ${offreDeStage.remunerationMin?.toString()} € et ${offreDeStage.remunerationMax?.toString()} €`;
		}
		return 'Aucune';
	}, [offreDeStage.remunerationBase]);

	const periodeDePaiementLabel = mapPeriodePaiementLabel(offreDeStage.remunerationPeriode);
	const doitAfficherPeriodeDePaiment = remuneration() !== 'Aucune' && remuneration() !== 'Non renseignée';

	return (
		<ConsulterOffreLayout>
			<header className={commonStyles.titre}>
				<h1>{offreDeStage.titre}</h1>
				{offreDeStage.employeur?.nom && <h2>{offreDeStage.employeur?.nom}</h2>}
				<TagList list={listeEtiquettes} aria-label="Caractéristiques de l‘offre de stage"/>
				<div className={commonStyles.buttonAsLinkWrapper}>
					<div className={commonStyles.buttonAsLink}>
						{offreDeStage.urlDeCandidature &&
							<Link
								href={offreDeStage.urlDeCandidature}
								appearance="asPrimaryButton">
								Postuler
								<Link.Icon/>
							</Link>
						}
					</div>
				</div>
			</header>
			<section className={commonStyles.contenu}>
				<dl>
					{offreDeStage.employeur?.description &&
						<div>
							<dt>Description de l‘employeur :</dt>
							<dd dangerouslySetInnerHTML={{ __html: descriptionEmployeurHtmlSanitiezd }}/>
						</div>}
					{offreDeStage.description &&
						<div>
							<dt>Description du poste :</dt>
							<dd dangerouslySetInnerHTML={{ __html: descriptionHtmlSanitized }}/>
						</div>
					}
					<div>
						<dt>Rémunération :</dt>
						<dd>{remuneration()}</dd>
					</div>
					{doitAfficherPeriodeDePaiment && <div>
						<dt>Période de paiement :</dt>
						<dd>{periodeDePaiementLabel}</dd>
					</div>}
				</dl>
			</section>
		</ConsulterOffreLayout>
	);
}
