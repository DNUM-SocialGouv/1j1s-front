import { CurrentRefinementsConnectorParamsItem } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import React, { useCallback } from 'react';
import {
	CurrentRefinementsProps,
} from 'react-instantsearch-hooks-web';

import { AnnonceDeLogement } from '~/client/components/features/Logement/Annonce';
import { FormulaireRechercheAnnonceLogement } from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import MeilisearchCustomCurrentRefinements
	from '~/client/components/ui/Meilisearch/MeilisearchCustomCurrentRefinements';
import { HeadTag } from '~/client/components/utils/HeaderTag';
import useReferrer from '~/client/hooks/useReferrer';
import { transformerMeilisearchLogementsItems } from '~/client/utils/transformerMeilisearchLogementsItems.utils';
import NotFound from '~/pages/404.page';

const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const ANNONCE_PAR_PAGE = 9 ;

export default function AnnoncesPage() {
	const displayAnnoncesLogement = process.env.NEXT_PUBLIC_LOGEMENT_FEATURE === '1';

	useReferrer();
	const transformItems: CurrentRefinementsProps['transformItems'] = useCallback((items: CurrentRefinementsConnectorParamsItem[]) => {
		return transformerMeilisearchLogementsItems(items);
	}, []);

	if (!displayAnnoncesLogement) return <NotFound/>;
	return (
		<>
			<HeadTag
				title="Rechercher un logement | 1jeune1solution"
				description="Logement étudiant et location jeune actif partout en France"
			/>
			<InstantSearchLayout
				meilisearchIndex={process.env.NEXT_PUBLIC_INDEX_ANNONCE_DE_LOGEMENT}
				nombreDeResultatParPage={ANNONCE_PAR_PAGE}
				titre="Logement étudiant et location jeune actif partout en France"
				sousTitre="Faites votre recherche parmi plus de 3 000 offres de logements étudiants"
				isMeilisearchQueryParamsRoutingEnabled={MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED}
				formulaireDeRecherche={<FormulaireRechercheAnnonceLogement />}
				messageResultatRechercheLabelSingulier="annonce pour étudiants"
				messageResultatRechercheLabelPluriel="annonces pour étudiants"
				nombreDeSkeleton={3}
				ariaLabelListeDesResultats="Annonces de logement"
				resultatDeRecherche={AnnonceDeLogement}
				tagList={<MeilisearchCustomCurrentRefinements transformItems={transformItems} />}
				isAffichageListeDeResultatsDesktopDirectionRow={false}
			/>
		</>
	);
}
