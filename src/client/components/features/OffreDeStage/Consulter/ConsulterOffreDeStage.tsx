import React, { useMemo } from 'react';

import commonStyles from '~/client/components/features/ConsulterOffre.module.scss';
import { dureeCategorisee } from '~/client/components/features/OffreDeStage/Consulter/getDureeCategorisee';
import { ConsulterOffreLayout } from '~/client/components/layouts/ConsulterOffre/ConsulterOffreLayout';
import { LinkStyledAsButton } from '~/client/components/ui/LinkStyledAsButton/LinkStyledAsButton';
import { getHtmlFromMd } from '~/client/components/ui/Marked/getHtmlFromMd';
import { TagList } from '~/client/components/ui/Tag/TagList';
import useSanitize from '~/client/hooks/useSanitize';
import { OffreDeStage } from '~/server/cms/domain/offreDeStage.type';

interface ConsulterOffreDeStageProps {
	offreDeStage: OffreDeStage
}

export function ConsulterOffreDeStage({ offreDeStage }: ConsulterOffreDeStageProps) {
	const listeEtiquettes = useMemo(() => {
		return [...offreDeStage.domaines, offreDeStage.localisation?.ville || offreDeStage.localisation?.departement || offreDeStage.localisation?.region,
			dureeCategorisee(offreDeStage.dureeEnJour || 0),
			offreDeStage.dateDeDebutMin === offreDeStage.dateDeDebutMax
				? `Débute le : ${new Date(offreDeStage.dateDeDebutMin).toLocaleDateString()}`
				: `Débute entre le : ${new Date(offreDeStage.dateDeDebutMin).toLocaleDateString()} et ${new Date(offreDeStage.dateDeDebutMax).toLocaleDateString()}`,
		];
	}, [offreDeStage]);

	const descriptionEmployeurHtmlSanitiezd =  useSanitize(offreDeStage.employeur.description ? getHtmlFromMd(offreDeStage.employeur.description) : undefined);
	const descriptionHtmlSanitized = useSanitize(getHtmlFromMd(offreDeStage.description));

	const salaireOffreDeStage = offreDeStage.remunerationBase?.toString();
	return (
		<ConsulterOffreLayout>
			<header className={commonStyles.titre}>
				<h1>{offreDeStage.titre}</h1>
				{offreDeStage.employeur?.nom && <h2>{offreDeStage.employeur?.nom}</h2>}
				<TagList list={listeEtiquettes} aria-label="Caractéristiques de l‘offre de stage"/>
				<div className={commonStyles.buttonAsLinkWrapper}>
					<div className={commonStyles.buttonAsLink}>
						{offreDeStage.urlDeCandidature &&
              <LinkStyledAsButton href={offreDeStage.urlDeCandidature} appearance="asPrimaryButton">Postuler</LinkStyledAsButton>}
					</div>
				</div>
			</header>
			<section className={commonStyles.contenu}>
				{offreDeStage.employeur?.description &&
            <div>
            	<h3>Description de l‘employeur :</h3>
            	<p dangerouslySetInnerHTML={{ __html: descriptionEmployeurHtmlSanitiezd }}/>
            </div>}
				{offreDeStage.description &&
            <div>
            	<h3>Description du poste :</h3>
            	<p dangerouslySetInnerHTML={{ __html: descriptionHtmlSanitized }}/>
            </div>
				}
				{offreDeStage.remunerationBase &&
          <div>
          	<h3>Salaire :</h3> {' '}
          	<p> {salaireOffreDeStage} €</p>
          </div>
				}
			</section>
		</ConsulterOffreLayout>
	);
}
