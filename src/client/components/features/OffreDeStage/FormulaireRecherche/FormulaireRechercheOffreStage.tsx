import React from 'react';

import styles from '~/client/components/features/OffreDeStage/FormulaireRecherche/FormulaireRechercheOffreStage.module.scss';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { MeilisearchInputRefinement } from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement';

const LIMIT_MAX_FACETS = 100000;
const LIMIT_MAX_DOMAINS = 100;
const MEILISEARCH_SORT_BY_LABEL_ASC = ['name:asc'];

export function FormulaireRechercheOffreStage() {
  return (
    <form className={styles.RechercherStageForm} onSubmit={(event) => event.preventDefault()}>
	  <MeilisearchCustomSearchBox
        label="Métiers, mots clés, …"
        name="motCle"
        placeholder="Métiers, mots clés, …"
	  />
	  <MeilisearchInputRefinement
        attribute="localisationFiltree"
        limit={LIMIT_MAX_FACETS}
	  />
	  <MeilisearchCustomRefinementList
        attribute="domaines"
        limit={LIMIT_MAX_DOMAINS}
        label="Domaines"
        sortBy={MEILISEARCH_SORT_BY_LABEL_ASC}
	  />
	  <MeilisearchCustomRefinementList
        attribute="dureeCategorisee"
        label="Durée de stage"
        sortBy={MEILISEARCH_SORT_BY_LABEL_ASC}
	  />
    </form>
  );
}
