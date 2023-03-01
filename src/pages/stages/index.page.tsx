import React from 'react';

import { FormulaireRechercheOffreStage } from '~/client/components/features/OffreDeStage/FormulaireRecherche/FormulaireRechercheOffreStage';
import { OffreDeStage } from '~/client/components/features/OffreDeStage/OffreDeStage';
import { Head } from '~/client/components/head/Head';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import MeilisearchCustomCurrentRefinements
	from '~/client/components/ui/Meilisearch/MeilisearchCustomCurrentRefinements';
import useReferrer from '~/client/hooks/useReferrer';

const HITS_PER_PAGE = 15;
const MEILISEARCH_INDEX = `${process.env.NEXT_PUBLIC_INDEX_OFFRE_DE_STAGE}`;
const MEILISEARCH_QUERY_PARAMS_ROUTING_ENABLED = true;

export default function RechercherOffreStagePage() {
	useReferrer();

	return (
		<>
			<Head
				title={'Rechercher un stage | 1jeune1solution'}
				description="Des milliers d‘offres de stages sélectionnées pour vous"
				robots="index,follow"
			/>
			<InstantSearchLayout
				meilisearchIndex={MEILISEARCH_INDEX}
				nombreDeResultatParPage={HITS_PER_PAGE}
				titre="Des milliers d‘offres de stages"
				sousTitre="sélectionnées pour vous"
				isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERY_PARAMS_ROUTING_ENABLED}
				formulaireDeRecherche={<FormulaireRechercheOffreStage />}
				messageResultatRechercheLabelSingulier="offre de stage"
				messageResultatRechercheLabelPluriel="offres de stage"
				nombreDeSkeleton={2}
				ariaLabelListeDesResultats="Offres de stage"
				resultatDeRecherche={OffreDeStage}
				tagList={<MeilisearchCustomCurrentRefinements />}
				isAffichageListeDeResultatsDesktopDirectionRow
			/>
		</>
	);
}
