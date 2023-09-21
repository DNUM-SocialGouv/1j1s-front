/**
 * @jest-environment jsdom
 */

import type { SearchResults } from 'algoliasearch-helper';

import {
	sortWithNonRenseigneInTheEnd,
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

describe('sortWithNonRenseigneInTheEnd', () => {
	it('tri les données par ordre ascendant avec Non rensigné à la fin', () => {
		const data = [
			anFacedValue({ name: 'ab' }),
			anFacedValue({ name: 'non renseigné' }),
			anFacedValue({ name: 's' }),
			anFacedValue({ name: 'n' }),
			anFacedValue({ name: 'a' }),
		];

		const sortedData = data.sort(sortWithNonRenseigneInTheEnd);

		expect(sortedData).toStrictEqual([
			anFacedValue({ name: 'a' }),
			anFacedValue({ name: 'ab' }),
			anFacedValue({ name: 'n' }),
			anFacedValue({ name: 's' }),
			anFacedValue({ name: 'non renseigné' }),
		]);
	});
});
