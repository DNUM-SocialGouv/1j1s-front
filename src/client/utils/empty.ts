import { removeUndefinedKeys } from '~/server/removeUndefinedKeys.utils';

export default function empty(object: Record<string, unknown>) {
	return Object.entries(removeUndefinedKeys(object)).length === 0;
}
