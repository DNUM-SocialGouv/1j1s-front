import {
	CurrentRefinementsConnectorParamsItem,
	CurrentRefinementsConnectorParamsRefinement,
} from 'instantsearch.js/es/connectors/current-refinements/connectCurrentRefinements';

import {
	PRIX_MAXIMUM,
	PRIX_MINIMUM,
	SURFACE_MAXIMUM,
	SURFACE_MINIMUM,
} from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement';
import { transformerMeilisearchLogementsItems } from '~/client/utils/transformerMeilisearchLogementsItems.utils';

const PRIX_MINIMUM_PAR_DEFAUT = PRIX_MINIMUM;
const PRIX_MAXIMUM_PAR_DEFAUT = PRIX_MAXIMUM;
const SURFACE_MINIMUM_PAR_DEFAUT = SURFACE_MINIMUM;
const SURFACE_MAXIMUM_PAR_DEFAUT = SURFACE_MAXIMUM;

const refineMock = jest.fn();

describe('transformerMeilisearchLogementsItems', () => {
	describe('quand les items sont de types disjunctives', () => {
		it('retourne les items tels quels', () => {
			const result = transformerMeilisearchLogementsItems(itemsWithoutNumericValue());
			const expected = expectedItemsWithoutNumericValue();
			expect(result).toEqual(expected);
		});
	});

	describe('quand les items sont de types numeric', () => {
		describe("et que l'attribut est prix", () => {
			describe('et que la valeur minimum est la valeur par défaut', () => {
				it('ne retourne pas la valeur minimum', () => {
					const result = transformerMeilisearchLogementsItems([
						{
							attribute: 'prix',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'prix',
							refine: refineMock,
							refinements: [
								aMinimumPriceDefaultRefinement(),
								aMaximumPriceRefinement(),
							],
						},
					]);
					const expected = [
						{
							attribute: 'prix',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'prix',
							refine: refineMock,
							refinements: [
								aTransformedMaximumPriceRefinement(),
							],
						},
					];
					expect(result).toEqual(expected);
				});
			});

			describe('et que la valeur maximum est la valeur par défaut', () => {
				it('ne retourne pas la valeur maximum', () => {
					const result = transformerMeilisearchLogementsItems([
						{
							attribute: 'prix',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'prix',
							refine: refineMock,
							refinements: [
								aMinimumPriceRefinement(),
								aMaximumPriceDefaultRefinement(),
							],
						},
					]);
					const expected = [
						{
							attribute: 'prix',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'prix',
							refine: refineMock,
							refinements: [
								aTransformedMinimumPriceRefinement(),
							],
						},
					];
					expect(result).toEqual(expected);
				});
			});

			describe('et que ce sont les valeurs par défaut', () => {
				it('ne retourne pas les items', () => {
					const result = transformerMeilisearchLogementsItems(itemsWithDefaultNumericPriceValue());
					const expected = expectedItemsWithDefaultNumericValue();
					expect(result).toEqual(expected);
				});
			});

			describe('et que les valeurs ne sont pas par défaut', () => {
				it('transforme le label du refinement', () => {
					const result = transformerMeilisearchLogementsItems([
						{
							attribute: 'prix',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'prix',
							refine: refineMock,
							refinements: [
								aMinimumPriceRefinement(),
								aMaximumPriceRefinement(),
							],
						},
					]);
					const expected = [
						{
							attribute: 'prix',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'prix',
							refine: refineMock,
							refinements: [
								aTransformedMinimumPriceRefinement(),
								aTransformedMaximumPriceRefinement(),
							],
						},
					];
					expect(result).toEqual(expected);
				});
			});
		});

		describe("et que l'attribut est surface", () => {
			describe('et que les valeurs sont celles par défaut', () => {
				it('ne retourne pas les items', () => {
					const result = transformerMeilisearchLogementsItems([
						{
							attribute: 'surface',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'surface',
							refine: refineMock,
							refinements: [
								aMinimumSurfaceDefaultRefinement(),
								aMaximumSurfaceDefaultRefinement(),
							],
						},
					]);
					const expected: CurrentRefinementsConnectorParamsItem[] = [];

					expect(result).toEqual(expected);
				});
			});

			describe('et que les valeurs ne sont pas celles par défaut', () => {
				it('retourne les items', () => {
					const result = transformerMeilisearchLogementsItems([
						{
							attribute: 'surface',
							indexId: 'id-index',
							indexName: 'nom-index',
							label: 'surface',
							refine: refineMock,
							refinements: [
								{
									attribute: 'surface',
									label: '15',
									operator: '>=',
									type: 'numeric',
									value: 15,
								},
								{
									attribute: 'surface',
									label: '45',
									operator: '<=',
									type: 'numeric',
									value: 45,
								},
							],
						},
					]);
					const expected: CurrentRefinementsConnectorParamsItem[] = [{
						attribute: 'surface',
						indexId: 'id-index',
						indexName: 'nom-index',
						label: 'surface',
						refine: refineMock,
						refinements: [
							aTransformedMinimumSurfaceRefinement(),
							aTransformedMaximumSurfaceRefinement(),
						],
					}];

					expect(result).toEqual(expected);
				});
			});
		});
	});
});

const itemsWithoutNumericValue = (): CurrentRefinementsConnectorParamsItem[] => {
	return [
		{
			attribute: 'typeBien',
			indexId: 'id-index',
			indexName: 'nom-index',
			label: 'typeBien',
			refine: refineMock,
			refinements: [
				{
					attribute: 'typeBien',
					label: 'appartement',
					type: 'disjunctive',
					value: 'appartement',
				},
				{
					attribute: 'typeBien',
					label: 'immeuble',
					type: 'disjunctive',
					value: 'immeuble',
				},
			],
		},
	];
};

const expectedItemsWithoutNumericValue = (): CurrentRefinementsConnectorParamsItem[] => {
	return [
		{
			attribute: 'typeBien',
			indexId: 'id-index',
			indexName: 'nom-index',
			label: 'typeBien',
			refine: refineMock,
			refinements: [
				{
					attribute: 'typeBien',
					label: 'appartement',
					type: 'disjunctive',
					value: 'appartement',
				},
				{
					attribute: 'typeBien',
					label: 'immeuble',
					type: 'disjunctive',
					value: 'immeuble',
				},

			],
		},
	];
};

const itemsWithDefaultNumericPriceValue = (): CurrentRefinementsConnectorParamsItem[] => {
	return [
		{
			attribute: 'prix',
			indexId: 'id-index',
			indexName: 'nom-index',
			label: 'prix',
			refine: refineMock,
			refinements: [
				aMinimumPriceDefaultRefinement(),
				aMaximumPriceDefaultRefinement(),
			],
		},
	];
};

const expectedItemsWithDefaultNumericValue = (): CurrentRefinementsConnectorParamsItem[] => [];


const aMinimumPriceDefaultRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'prix',
		label: `>= ${PRIX_MINIMUM_PAR_DEFAUT}`,
		operator: '>=',
		type: 'numeric',
		value: PRIX_MINIMUM_PAR_DEFAUT,
	};
};

const aMinimumPriceRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'prix',
		label: '>= 400',
		operator: '>=',
		type: 'numeric',
		value: 400,
	};
};

const aTransformedMinimumPriceRefinement = (): CurrentRefinementsConnectorParamsRefinement  => {
	return {
		attribute: 'prix',
		label: 'A partir de 400 €',
		operator: '>=',
		type: 'numeric',
		value: 400,
	};
};

const aMaximumPriceRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'prix',
		label: '<= 1000',
		operator: '<=',
		type: 'numeric',
		value: 1000,
	};
};

const aTransformedMaximumPriceRefinement = (): CurrentRefinementsConnectorParamsRefinement  => {
	return {
		attribute: 'prix',
		label: 'Jusqu‘à 1000 €',
		operator: '<=',
		type: 'numeric',
		value: 1000,
	};
};

const aMaximumPriceDefaultRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'prix',
		label: `<= ${PRIX_MAXIMUM_PAR_DEFAUT}`,
		operator: '<=',
		type: 'numeric',
		value: PRIX_MAXIMUM_PAR_DEFAUT,
	};
};

const aMinimumSurfaceDefaultRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'surface',
		label: `${SURFACE_MINIMUM_PAR_DEFAUT}`,
		operator: '>=',
		type: 'numeric',
		value: SURFACE_MINIMUM_PAR_DEFAUT,
	};
};

const aMaximumSurfaceDefaultRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'surface',
		label: `${SURFACE_MAXIMUM_PAR_DEFAUT}`,
		operator: '<=',
		type: 'numeric',
		value: SURFACE_MAXIMUM_PAR_DEFAUT,
	};
};

const aTransformedMinimumSurfaceRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'surface',
		label: 'A partir de 15 m²',
		operator: '>=',
		type: 'numeric',
		value: 15,
	};
};

const aTransformedMaximumSurfaceRefinement = (): CurrentRefinementsConnectorParamsRefinement => {
	return {
		attribute: 'surface',
		label: 'Jusqu‘à 45 m²',
		operator: '<=',
		type: 'numeric',
		value: 45,
	};
};
