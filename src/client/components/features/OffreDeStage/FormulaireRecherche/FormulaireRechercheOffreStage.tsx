import type { SearchResults } from 'algoliasearch-helper';
import React from 'react';

import styles
	from '~/client/components/features/OffreDeStage/FormulaireRecherche/FormulaireRechercheOffreStage.module.scss';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';
import { Domaines } from '~/server/cms/domain/offreDeStage.type';

const LIMIT_MAX_FACETS = 100000;
const LIMIT_MAX_DOMAINS = 100;
const MEILISEARCH_SORT_BY_LABEL_ASC = 'name:asc';

export function sortWithNonRenseigneInTheEnd(a: SearchResults.FacetValue, b: SearchResults.FacetValue) {
	if (a.name === Domaines.NON_RENSEIGNE && b.name !== Domaines.NON_RENSEIGNE) {
		return 1;
	} else if (a.name !== Domaines.NON_RENSEIGNE && b.name === Domaines.NON_RENSEIGNE) {
		return -1;
	} else {
		return a.name.localeCompare(b.name);
	}
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
				sortBy={sortWithNonRenseigneInTheEnd}
			/>
			<MeilisearchCustomRefinementList
				attribute="dureeCategorisee"
				label="Durée de stage"
				sortBy={[MEILISEARCH_SORT_BY_LABEL_ASC]}
			/>
		</form>
	);
}
