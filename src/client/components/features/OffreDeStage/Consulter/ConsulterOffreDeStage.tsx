import React, { useCallback, useMemo } from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { dureeCategorisee } from '~/client/components/features/OffreDeStage/Consulter/getDureeCategorisee';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { Link } from '~/client/components/ui/Link/Link';
import { getHtmlFromMd } from '~/client/components/ui/MarkdownToHtml/getHtmlFromMd';
import { TagList } from '~/client/components/ui/Tag/TagList';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import useSanitize from '~/client/hooks/useSanitize';
import { DateService } from '~/client/services/date/date.service';
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
		case RemunerationPeriode.DAILY:
			return 'Par jour';
		case RemunerationPeriode.MONTHLY:
			return 'Par mois';
		case RemunerationPeriode.YEARLY:
			return 'Par an';
		default:
			return 'Par mois';
	}
};

const LABEL_AUCUNE_REMUNERATION = 'Aucune';
const LABEL_REMUNERATION_NON_RENSEIGNEE = 'Non renseignée';

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {
	const dateService = useDependency<DateService>('dateService');

	const formatDate = useCallback((dateDebutMin: string, dateDebutMax?: string) => {
		if (!dateDebutMax || dateDebutMin === dateDebutMax) return `Débute le ${dateService.formatToHumanReadableDate(new Date(dateDebutMin))}`;

		return `Débute entre le ${dateService.formatToHumanReadableDate(new Date(dateDebutMin))} et le ${dateService.formatToHumanReadableDate(new Date(dateDebutMax))}`;
	}, [dateService]);

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
			tags.push(formatDate(offreDeStage.dateDeDebutMin, offreDeStage.dateDeDebutMax));
		}
		return tags;
	}, [offreDeStage, formatDate]);

	const descriptionEmployeurHtmlSanitiezd = useSanitize(offreDeStage.employeur?.description && getHtmlFromMd(offreDeStage.employeur.description));
	const descriptionHtmlSanitized = useSanitize(getHtmlFromMd(offreDeStage.description));

	const remuneration = useCallback(function getRemunerationOffreDeStage() {
		if (offreDeStage.remunerationMin === undefined && offreDeStage.remunerationMax === undefined) {
			return LABEL_REMUNERATION_NON_RENSEIGNEE;
		}
		if (offreDeStage.remunerationMin && offreDeStage.remunerationMax && offreDeStage.remunerationMin === offreDeStage.remunerationMax && offreDeStage.remunerationMin > 0) {
			return `${offreDeStage.remunerationMin.toString()} €`;
		}
		if (offreDeStage.remunerationMax && offreDeStage.remunerationMax > 0) {
			return `entre ${offreDeStage.remunerationMin?.toString()} € et ${offreDeStage.remunerationMax?.toString()} €`;
		}
		return LABEL_AUCUNE_REMUNERATION;
	}, [offreDeStage.remunerationMin, offreDeStage.remunerationMax])();

	const periodeDePaiementLabel = mapPeriodePaiementLabel(offreDeStage.remunerationPeriode);
	const doitAfficherPeriodeDePaiment = remuneration !== LABEL_AUCUNE_REMUNERATION && remuneration !== LABEL_REMUNERATION_NON_RENSEIGNEE;

	return (
		<ConsulterOffreLayout>
			<header className={commonStyles.titre}>
				<h1>{offreDeStage.titre}</h1>
				{offreDeStage.employeur?.nom && <h2>{offreDeStage.employeur?.nom}</h2>}
				<TagList list={listeEtiquettes} aria-label="Caractéristiques de l‘offre de stage" />
				<div className={commonStyles.buttonAsLinkWrapper}>
					<div className={commonStyles.buttonAsLink}>
						{offreDeStage.urlDeCandidature && (
							<Link
								href={offreDeStage.urlDeCandidature}
								appearance="asPrimaryButton">
								Postuler
								<Link.Icon />
							</Link>
						)}
					</div>
				</div>
			</header>
			<section className={commonStyles.contenu}>
				<dl>
					{offreDeStage.employeur?.description && (
						<div>
							<dt>Description de l‘employeur :</dt>
							<dd dangerouslySetInnerHTML={{ __html: descriptionEmployeurHtmlSanitiezd }} />
						</div>
					)}
					{offreDeStage.description && (
						<div>
							<dt>Description du poste :</dt>
							<dd dangerouslySetInnerHTML={{ __html: descriptionHtmlSanitized }} />
						</div>
					)}
					<div>
						<dt>Rémunération :</dt>
						<dd>{remuneration}</dd>
					</div>
					{doitAfficherPeriodeDePaiment && (
						<div>
							<dt>Période de paiement :</dt>
							<dd>{periodeDePaiementLabel}</dd>
						</div>
					)}
				</dl>
			</section>
		</ConsulterOffreLayout>
	);
}
