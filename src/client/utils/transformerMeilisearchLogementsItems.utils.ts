import { CurrentRefinementsConnectorParamsItem } from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

import {
	DEVISE,
	PRIX_MAXIMUM,
	PRIX_MINIMUM,
	SURFACE_MAXIMUM,
	SURFACE_MINIMUM,
	UNITE_SURFACE,
} from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement';

const PRIX_MINIMUM_PAR_DEFAUT = PRIX_MINIMUM;
const PRIX_MAXIMUM_PAR_DEFAUT = PRIX_MAXIMUM;
const SURFACE_MINIMUM_PAR_DEFAUT = SURFACE_MINIMUM;
const SURFACE_MAXIMUM_PAR_DEFAUT = SURFACE_MAXIMUM;
const itemSpecificAttributes = ['prix', 'surface'];

export const transformerMeilisearchLogementsItems = (items: CurrentRefinementsConnectorParamsItem[]): CurrentRefinementsConnectorParamsItem[] => {
	return items.map((item) => {
		if (isItemWithSpecificAttribute(item.attribute)) {
			return { ...item, refinements: getRefinements(item) };
		}
		return item;
	}).filter((item) => item.refinements.length > 0);
};

function isItemWithSpecificAttribute(attribute: string): boolean {
	return itemSpecificAttributes.includes(attribute);
}

function getRefinements(item: CurrentRefinementsConnectorParamsItem) {
	const minimumParDefaut = item.attribute === 'prix' ? PRIX_MINIMUM_PAR_DEFAUT : SURFACE_MINIMUM_PAR_DEFAUT;
	const maximumParDefaut = item.attribute === 'prix' ? PRIX_MAXIMUM_PAR_DEFAUT : SURFACE_MAXIMUM_PAR_DEFAUT;
	const uniteAAfficher = item.attribute === 'prix' ? DEVISE : UNITE_SURFACE;

	return item.refinements
		.filter((refinement) => !(refinement.operator === '>=' && refinement.value === minimumParDefaut))
		.filter((refinement) => !(refinement.operator === '<=' && refinement.value === maximumParDefaut))
		.map((refinement) => ({
			...refinement,
			label: refinement.operator === '>=' ? `A partir de ${refinement.value} ${uniteAAfficher}` : `Jusqu‘à ${refinement.value} ${uniteAAfficher}`,
		}));
}
