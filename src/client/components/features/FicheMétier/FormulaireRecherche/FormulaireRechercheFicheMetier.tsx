import { SearchResults } from 'algoliasearch-helper';
import { SortBy } from 'instantsearch.js/es/types';

import styles  from '~/client/components/features/FicheMétier/FormulaireRecherche/FormulaireRechercheFicheMetier.module.scss';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';

const MEILISEARCH_SORT_BY_LABEL_ASC = ['name:asc'];

export function FormulaireRechercheFicheMetier() {
	return (
		<form className={styles.RechercherMetierForm} onSubmit={(event) => event.preventDefault()}>
	  <MeilisearchCustomSearchBox
				className={styles.inputNomMetier}
				label="Métier"
				name="metier"
				placeholder="Exemple : cuisinier"
	  />
	  <MeilisearchCustomRefinementList
				className={styles.inputCentresInteret}
				attribute="centres_interet"
				limit={100}
				label="Centres d‘intérêt"
				sortBy={MEILISEARCH_SORT_BY_LABEL_ASC as SortBy<SearchResults.FacetValue>}
	  />
		</form>
	);
}
