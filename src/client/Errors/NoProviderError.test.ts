import { createContext } from 'react';

import NoProviderError from '~/client/Errors/NoProviderError';

describe('NoProviderError', () => {
	it('affiche un message générique quand aucun context n’est passé au constructeur', () => {
		function Throw() {
			throw new NoProviderError();
		}

		expect(Throw).toThrow('Context provider not found');
	});
	it('affiche un message générique quand un context sans displayName est passé au constructeur', () => {
		const context = createContext<null>(null);

		function Throw() {
			throw new NoProviderError(context);
		}

		expect(Throw).toThrow('Context provider not found');
	});
	it('affiche un message complet quand un context avec displayName est passé au constructeur', () => {
		const context = createContext<null>(null);
		context.displayName = 'MonContext';

		function Throw() {
			throw new NoProviderError(context);
		}

		expect(Throw).toThrow('Context provider not found for MonContext');
	});
});
