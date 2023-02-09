import { AlternanceQuery } from '~/server/alternances/domain/alternance';

export function anAlternanceFQuery(): AlternanceQuery {
	return {
		codeRomes: ['D1406', 'D1407'],
	};
}
