import Joi from 'joi';

import { queryToArray } from '~/server/utils/queryToArray.utils';

export const transformQueryToArray = Joi.extend((joi) => {
	return {
		base: joi.array(),
		prepare(value: string): { value: Array<string> } {
			return { value: queryToArray(value) };
		},
		type: 'array',
	};
});
