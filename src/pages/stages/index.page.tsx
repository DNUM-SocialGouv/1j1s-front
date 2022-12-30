import React from 'react';

import { FormulaireRechercheOffreStage } from '~/client/components/features/OffreDeStage/FormulaireRecherche/FormulaireRechercheOffreStage';
import { OffreDeStage } from '~/client/components/features/OffreDeStage/OffreDeStage';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';

const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = 'offre-de-stage:dateDeDebut:desc';
const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;

export default function RechercherOffreStagePage() {
	useReferrer();

	return (
		<>
			<HeadTag
				title={'Rechercher un stage | 1jeune1solution'}
				description="Des milliers d‘offres de stages sélectionnées pour vous"/>
			<InstantSearchLayout
				meilisearchIndex={MEILISEARCH_INDEX}
				nombreDeResultatParPage={HITS_PER_PAGE}
				titre="Des milliers d‘offres de stages"
				sousTitre="sélectionnées pour vous"
				isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
				formulaireDeRecherche={<FormulaireRechercheOffreStage />}
				messageResultatRechercheLabelSingulier="offre de stage"
				messageResultatRechercheLabelPluriel="offres de stage"
				nombreDeSkeleton={2}
				ariaLabelListeDesResultats="Offres de stage"
				resultatDeRecherche={OffreDeStage}
				hasTagList
				isAffichageListeDeResultatsDesktopDirectionRow
			/>
		</>
	);
}
