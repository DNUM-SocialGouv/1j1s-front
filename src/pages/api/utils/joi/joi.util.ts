import Joi from 'joi';

import { queryToArray } from '~/pages/api/utils/queryToArray.util';

export const transformQueryToArray = Joi.extend((joi) => {
	return {
		base: joi.array(),
		prepare(value: string): { value: Array<string> } {
			return { value: queryToArray(value) };
		},
		type: 'array',
	};
});
