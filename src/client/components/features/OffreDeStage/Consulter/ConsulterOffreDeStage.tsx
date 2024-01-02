import React, { useCallback, useMemo } from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { dureeCategorisee } from '~/client/components/features/OffreDeStage/Consulter/getDureeCategorisee';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButtonWithIcon } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { getHtmlFromMd } from '~/client/components/ui/Marked/getHtmlFromMd';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { OffreDeStage } from '~/server/stages/domain/stages';

interface ConsulterOffreDeStageProps {
	offreDeStage: OffreDeStage
}

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {
	const listeEtiquettes = useMemo(() => {
		const tags = [
			...offreDeStage.domaines,
			offreDeStage.localisation?.ville || offreDeStage.localisation?.departement || offreDeStage.localisation?.region,
			dureeCategorisee(offreDeStage.dureeEnJour || 0),
		];
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
		if (offreDeStage.remunerationBase === undefined) {
			return 'Non renseignée';
		}
		return offreDeStage.remunerationBase > 0 ? `${offreDeStage.remunerationBase?.toString()} €` : 'Aucune';
	}, [offreDeStage.remunerationBase]);

	return (
		<ConsulterOffreLayout>
			<header className={commonStyles.titre}>
				<h1>{offreDeStage.titre}</h1>
				{offreDeStage.employeur?.nom && <h2>{offreDeStage.employeur?.nom}</h2>}
				<TagList list={listeEtiquettes} aria-label="Caractéristiques de l‘offre de stage"/>
				<div className={commonStyles.buttonAsLinkWrapper}>
					<div className={commonStyles.buttonAsLink}>
						{offreDeStage.urlDeCandidature &&
                <LinkStyledAsButtonWithIcon
                	href={offreDeStage.urlDeCandidature}
                	appearance="asPrimaryButton">
                    Postuler
                </LinkStyledAsButtonWithIcon>
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
				</dl>
			</section>
		</ConsulterOffreLayout>
	);
}
