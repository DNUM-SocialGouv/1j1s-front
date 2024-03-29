import React, { useState } from 'react';

import styles
	from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement.module.scss';
import { ButtonComponent } from '~/client/components/ui/Button/ButtonComponent';
import { FilterAccordion } from '~/client/components/ui/FilterAccordion/FilterAccordion';
import { Icon } from '~/client/components/ui/Icon/Icon';
import { MeilisearchCustomRangeInput } from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInput';
import {
	MeilisearchCustomRangeInputForModal,
} from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInputForModal';
import { MeilisearchCustomRefinementList } from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementList';
import {
	MeilisearchCustomRefinementListForModal,
} from '~/client/components/ui/Meilisearch/MeilisearchCustomRefinementListForModal';
import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';
import { ModalComponent } from '~/client/components/ui/Modal/ModalComponent';

export const PRIX_MINIMUM = 0;
export const PRIX_MAXIMUM = 3000;
export const SURFACE_MINIMUM = 0;
export const SURFACE_MAXIMUM = 500;
export const DEVISE = '€';
export const UNITE_SURFACE = 'm²';

export function FormulaireRechercheAnnonceLogement() {
	const [isFiltresAvancésMobileOpen, setIsFiltresAvancésMobileOpen] = useState(false);

	return (
		<form
			className={styles.RechercherLogementForm}
			role="search"
			onSubmit={(event) => event.preventDefault()}>
			<MeilisearchCustomSearchBox
				className={styles.inputVille}
				label="Ville"
				name="ville"
				placeholder="Exemples : Paris, Toulouse"
			/>
			<MeilisearchCustomRefinementList
				className={styles.filtresDesktop}
				attribute="type"
				label="Type d‘offre"
				sortBy={['name:asc']}
				data-testid="input-type-offre-desktop"
			/>
			<MeilisearchCustomRefinementList
				className={styles.filtresDesktop}
				attribute="typeBien"
				label="Type de bien"
				sortBy={['name:asc']}
				data-testid="input-type-bien-desktop"
			/>
			<MeilisearchCustomRangeInput
				className={styles.filtresDesktop}
				attribute="surface"
				label="Surface (m²)"
				placeholder="Surface"
				unite={UNITE_SURFACE}
				min={SURFACE_MINIMUM}
				max={SURFACE_MAXIMUM}
				data-testid="input-surface-desktop"
			/>
			<MeilisearchCustomRangeInput
				className={styles.filtresDesktop}
				attribute="prix"
				label="Prix"
				placeholder="Fourchette de prix"
				unite={DEVISE}
				min={PRIX_MINIMUM}
				max={PRIX_MAXIMUM}
				data-testid="input-prix-desktop"
			/>
			<div className={styles.filtresAvancesMobile}>
        	<ButtonComponent
        		appearance="quaternary"
        		icon={<Icon name="filter"/>}
        		iconPosition="right"
        		label="Filtrer ma recherche"
					data-testid="bouton-filtrer-recherche-mobile"
        		onClick={() => setIsFiltresAvancésMobileOpen(true)}
        	/>
        	<ModalComponent
        		className={isFiltresAvancésMobileOpen ? styles.show : styles.hide}
        		close={() => setIsFiltresAvancésMobileOpen(false)}
        		closeTitle="Fermer les filtres"
        		isOpen={isFiltresAvancésMobileOpen}
        		keepModalMounted
        		aria-labelledby="dialog_label">
        		<ModalComponent.Title>
        			<Icon name="menu"/>
        			<span id="dialog_label">Filtrer ma recherche</span>
        		</ModalComponent.Title>
        		<ModalComponent.Content className={styles.filtresAvancésModalContenu}>
        			<FilterAccordion title="Type d‘offre" open>
        				<MeilisearchCustomRefinementListForModal
        					attribute="type"
        					label="Type d‘offre"
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
        			<FilterAccordion title="Prix">
        				<MeilisearchCustomRangeInputForModal
        					attribute="prix"
        					unite="€"
        					min={PRIX_MINIMUM}
        					max={PRIX_MAXIMUM}
        				/>
        			</FilterAccordion>
        			<FilterAccordion title="Surface">
        				<MeilisearchCustomRangeInputForModal
        					attribute="surface"
        					unite="m²"
        					min={SURFACE_MINIMUM}
        					max={SURFACE_MAXIMUM}
        				/>
        			</FilterAccordion>
        		</ModalComponent.Content>
        		<ModalComponent.Footer>
        			<div className={styles.applyFiltersButton}>
        				<ButtonComponent
        					icon={<Icon name="angle-right"/>}
        					iconPosition="right"
        					label="Appliquer les filtres"
        					onClick={() => setIsFiltresAvancésMobileOpen(false)}
        				/>
        			</div>
        		</ModalComponent.Footer>
        	</ModalComponent>
			</div>
		</form>
	);
}
