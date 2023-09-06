import { removeParenthesis } from '~/server/localisations/infra/repositories/apiAdresse.mapper';

describe('RemoveParenthesis', () => {
	it('enlève les parenthèses', () => {
		// Given
		const input = 'test (75010)';

		// When
		const result = removeParenthesis(input);

		// Then
		expect(result).toEqual('test 75010');
	});
});
