/**
 * @jest-environment jsdom
 */

import { formatNumberWithSpace } from '~/client/utils/formatNumberWithSpace';

describe('formatNumberWithSpace', () => {
	it.each`
		numberToFormat | numberFormatted
		${'1'}				 | ${'1'}
		${'12'}				 | ${'12'}
		${'123'}			 | ${'123'}
    ${'1234'}			 | ${'1 234'}
		${'12345'}		 | ${'12 345'}
		${'123456'}		 | ${'123 456'}
		${'1234567'}	 | ${'1 234 567'}
		${'12345678'}	 | ${'12 345 678'}`(
		'Le nombre $numberToFormat n‘a pas été correctement formaté',

		({ numberToFormat, numberFormatted }) => {
			expect(formatNumberWithSpace(numberToFormat)).toBe(numberFormatted);
		});
});
