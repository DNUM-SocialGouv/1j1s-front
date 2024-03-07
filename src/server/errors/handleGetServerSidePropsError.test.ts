import { GetServerSidePropsContext } from 'next';

import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { handleGetServerSidePropsError } from '~/server/errors/handleGetServerSidePropsError';

describe('handleGetServerSidePropsError', () => {
	describe('quand l’erreur est CONTENU_INDISPONIBLE', () => {
		it('laisse Next gérer nativement en retournant { notFound: true }', () => {
			// Given
			const context = {} as GetServerSidePropsContext;
			const erreur = ErreurMetier.CONTENU_INDISPONIBLE;

			// When
			const result = handleGetServerSidePropsError(context, erreur);

			// Then
			expect(result).toEqual({ notFound: true });
		});
	});

	describe('quand l’erreur n’est pas CONTENU_INDISPONIBLE', () => {
		it.each([
			[ErreurMetier.DEMANDE_INCORRECTE, 400],
			[ErreurMetier.CONFLIT_D_IDENTIFIANT, 409],
			[ErreurMetier.SERVICE_INDISPONIBLE, 500],
		])('pour %s, modifie le code statut de la réponse à %d', (erreur, codeStatutAttendu) => {
			// Given
			const statusCodeInitial = 0;
			const context = { res: { statusCode: statusCodeInitial } } as unknown as GetServerSidePropsContext;

			// When
			handleGetServerSidePropsError(context, erreur);

			// Then
			expect(context.res.statusCode).toBe(codeStatutAttendu);
		});

		it.each([
			[ErreurMetier.DEMANDE_INCORRECTE],
			[ErreurMetier.CONFLIT_D_IDENTIFIANT],
			[ErreurMetier.SERVICE_INDISPONIBLE],
		])('retourne un objet avec la propriété error égale à %s', (erreur) => {
			// Given
			const statusCodeInitial = 0;
			const context = { res: { statusCode: statusCodeInitial } } as unknown as GetServerSidePropsContext;

			// When
			const result = handleGetServerSidePropsError(context, erreur);

			// Then
			expect(result).toEqual({
				props: {
					error: erreur,
				},
			});
		});
	});
});
