import { CurrentRefinementsConnectorParamsItem } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';
import React, { useCallback } from 'react';
import {
	CurrentRefinementsProps,
} from 'react-instantsearch-hooks-web';

import { AnnonceDeLogement } from '~/client/components/features/Logement/Annonce';
import { FormulaireRechercheAnnonceLogement } from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement';
import { Head } from '~/client/components/head/Head';
import ErrorUnavailableService from '~/client/components/layouts/Error/ErrorUnavailableService';
import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import MeilisearchCustomCurrentRefinements
	from '~/client/components/ui/Meilisearch/MeilisearchCustomCurrentRefinements';
import useAnalytics from '~/client/hooks/useAnalytics';
import useReferrer from '~/client/hooks/useReferrer';
import { transformerMeilisearchLogementsItems } from '~/client/utils/transformerMeilisearchLogementsItems.utils';

const MEILISEARCH_QUERYPARAMS_ROUTING_ENABLED = true;
const ANNONCE_PAR_PAGE = 9 ;

export default function AnnoncesPage() {
	const displayAnnoncesLogement = process.env.NEXT_PUBLIC_LOGEMENT_FEATURE === '1';

	useAnalytics('logements/annonces');
	useReferrer();
	const transformItems: CurrentRefinementsProps['transformItems'] = useCallback((items: CurrentRefinementsConnectorParamsItem[]) => {
		return transformerMeilisearchLogementsItems(items);
	}, []);

	if (!displayAnnoncesLogement) return <ErrorUnavailableService/>;
	return (
		<>
			<Head
				title="Rechercher un logement | 1jeune1solution"
				description="Logement étudiant et location jeune actif partout en France"
				robots="index,follow"
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
