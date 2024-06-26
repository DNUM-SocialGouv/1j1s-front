import React from 'react';

import styles
	from '~/client/components/features/Evenement/FormulaireRecherche/FormulaireRechercheEvenement.module.scss';
import { MeilisearchComboboxLocalisation } from '~/client/components/ui/Meilisearch/MeilisearchComboboxLocalisation';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';

const LIMIT_MAX_FACETS = 10000;

export function FormulaireRechercheEvenement() {
	return (
		<form className={styles.rechercherEvenementForm} onSubmit={(event) => event.preventDefault()}>
	  <MeilisearchCustomSearchBox
				label="Mot-clé, métier, accompagnement…"
				name="motCle"
				placeholder="Exemples : gendarmerie, cuisinier, mentorat"
	  />
	  <MeilisearchComboboxLocalisation
				attribute="lieuEvenement"
				limit={LIMIT_MAX_FACETS}
	  />
		</form>
	);
}
