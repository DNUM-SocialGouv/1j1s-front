import type { SearchResults } from 'algoliasearch-helper';
import React from 'react';

import styles
	from '~/client/components/features/OffreDeStage/FormulaireRecherche/FormulaireRechercheOffreStage.module.scss';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';
import { DomainesStage } from '~/server/stages/repository/domainesStage';

const LIMIT_MAX_FACETS = 100000;
const LIMIT_MAX_DOMAINS = 100;

export function sortWithNonRenseigneAtTheEnd(a: SearchResults.FacetValue, b: SearchResults.FacetValue) {
	if (a.name === DomainesStage.NON_RENSEIGNE) {
		return 1;
	} else if (b.name === DomainesStage.NON_RENSEIGNE) {
		return -1;
	}
	return a.name.localeCompare(b.name);
}

export function sortWithMoinsUnMoisAtTheBegining(a: SearchResults.FacetValue, b: SearchResults.FacetValue) {
	const MOINS_D_UN_MOIS = '< 1 mois';
	if (a.name === MOINS_D_UN_MOIS) {
		return -1;
	}
	if (b.name === MOINS_D_UN_MOIS) {
		return 1;
	}
	if (a.name < b.name) {
		return -1;
	}
	if (a.name > b.name) {
		return 1;
	}
	return 0;
}

export function FormulaireRechercheOffreStage() {
	return (
		<form className={styles.RechercherStageForm} onSubmit={(event) => event.preventDefault()}>
			<MeilisearchCustomSearchBox
				label="Métiers, mots clés, …"
				name="motCle"
				placeholder="Exemples : designer, juriste…"
			/>
			<MeilisearchInputRefinement
				attribute="localisationFiltree"
				limit={LIMIT_MAX_FACETS}
			/>
			<MeilisearchCustomRefinementList
				attribute="domaines"
				limit={LIMIT_MAX_DOMAINS}
				label="Domaines"
				sortBy={sortWithNonRenseigneAtTheEnd}
			/>
			<MeilisearchCustomRefinementList
				attribute="dureeCategorisee"
				label="Durée de stage"
				sortBy={sortWithMoinsUnMoisAtTheBegining}
			/>
		</form>
	);
}
