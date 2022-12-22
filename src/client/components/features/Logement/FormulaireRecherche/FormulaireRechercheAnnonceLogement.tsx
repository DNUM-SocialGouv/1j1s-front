import React, {
  useState,
} from 'react';

import styles from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import { MeilisearchCustomRefinementListForModal } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementListForModal';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';
import useBreakpoint from '~/client/hooks/useBreakpoint';

export function FormulaireRechercheAnnonceLogement() {
  const { isSmallScreen } = useBreakpoint();
  const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

  return (
    <form
	  className={styles.RechercherLogementForm}
	  role="search"
	  onSubmit={(event) => event.preventDefault()}>
	  <MeilisearchCustomSearchBox
        className={styles.inputVille}
        label="Rechercher par ville"
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
	  />
	  { !isSmallScreen && (
        <>
		  <MeilisearchCustomRefinementList
            className={styles.inputType}
            attribute="type"
            label="Type d'offre"
            sortBy={['name:asc']}
		  />
		  <MeilisearchCustomRefinementList
            className={styles.inputTypeBien}
            attribute="typeBien"
            label="Type de bien"
            sortBy={['name:asc']}
		  />
        </>
	  )}
	  {isSmallScreen &&
		<div>
		  <ButtonComponent
		    appearance='tertiary'
		    icon={<Icon name="filter" />}
		    iconPosition='right'
		    label='Filtrer ma recherche'
		    onClick={() => setIsFiltresAvancésMobileOpen(true)}
		  />
		  <ModalComponent
		    className={isFiltresAvancésMobileOpen ? styles.show : styles.hide}
		    close={() => setIsFiltresAvancésMobileOpen(false)}
		    closeTitle="Fermer les filtres"
		    isOpen={isFiltresAvancésMobileOpen}
		    unMountModal={false}
		    aria-labelledby="dialog_label">
		    <ModalComponent.Title>
			  <Icon name="menu" />
			  <span id="dialog_label">Filtrer ma recherche</span>
		    </ModalComponent.Title>
		    <ModalComponent.Content className={styles.filtresAvancésModalContenu}>
			  <FilterAccordion title="Type d'offre" open>
		        <MeilisearchCustomRefinementListForModal
				  attribute="type"
				  label="Type d'offre"
				  sortBy={['name:asc']}
		        />
			  </FilterAccordion>
			  <FilterAccordion title="Type de bien">
		        <MeilisearchCustomRefinementListForModal
				  attribute="typeBien"
				  label="Type de bien"
				  sortBy={['name:asc']}
		        />
			  </FilterAccordion>

		    </ModalComponent.Content>
		    <ModalComponent.Footer>
			  <div className={styles.applyFiltersButton}>
		        <ButtonComponent
				  icon={<Icon name="angle-right" />}
				  iconPosition='right'
				  label='Appliquer les filtres'
				  onClick={() => setIsFiltresAvancésMobileOpen(false)}
		        />
			  </div>
		    </ModalComponent.Footer>
		  </ModalComponent>
		</div>
	  }

    </form>
  );
}
