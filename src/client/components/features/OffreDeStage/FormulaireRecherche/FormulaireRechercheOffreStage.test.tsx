/**
 * @jest-environment jsdom
 */

import type { SearchResults } from 'algoliasearch-helper';

import {
	sortWithMoinsUnMoisAtTheBegining,
	sortWithNonRenseigneAtTheEnd,
} from '~/client/components/features/OffreDeStage/FormulaireRecherche/FormulaireRechercheOffreStage';

function anFacedValue(override ?: Partial<SearchResults.FacetValue>): SearchResults.FacetValue {
	return {
		count: 1,
		escapedValue: '',
		isExcluded: false,
		isRefined: false,
		name: 'name',
		...override,
	};
}

describe('sortWithNonRenseigneAtTheEnd', () => {
	it('tri les données par ordre ascendant avec Non rensigné à la fin', () => {
		const data = [
			anFacedValue({ name: 'ab' }),
			anFacedValue({ name: 'non renseigné' }),
			anFacedValue({ name: 's' }),
			anFacedValue({ name: 'n' }),
			anFacedValue({ name: 'a' }),
		];

		const sortedData = data.sort(sortWithNonRenseigneAtTheEnd);

		expect(sortedData).toStrictEqual([
			anFacedValue({ name: 'a' }),
			anFacedValue({ name: 'ab' }),
			anFacedValue({ name: 'n' }),
			anFacedValue({ name: 's' }),
			anFacedValue({ name: 'non renseigné' }),
		]);
	});
});

describe('sortWithMoinsUnMoisAtTheBegining', () => {
	it('tri les données par ordre ascendant avec < 1 mois au début', () => {
		const data = [
			anFacedValue({ name: '< 1 mois' }),
			anFacedValue({ name: 'non renseigné' }),
			anFacedValue({ name: '3 mois' }),
			anFacedValue({ name: '1 mois' }),
			anFacedValue({ name: '2 mois' }),
			anFacedValue({ name: '> 6 mois' }),
		];

		const sortedData = data.sort(sortWithMoinsUnMoisAtTheBegining);


		expect(sortedData).toStrictEqual([
			anFacedValue({ name: '< 1 mois' }),
			anFacedValue({ name: '1 mois' }),
			anFacedValue({ name: '2 mois' }),
			anFacedValue({ name: '3 mois' }),
			anFacedValue({ name: '> 6 mois' }),
			anFacedValue({ name: 'non renseigné' }),
		]);
	});
});
