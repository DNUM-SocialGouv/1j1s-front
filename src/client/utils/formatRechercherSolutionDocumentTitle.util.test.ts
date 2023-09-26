import { formatRechercherSolutionDocumentTitle } from '~/client/utils/formatRechercherSolutionDocumentTitle.util';
import { Erreur } from '~/server/errors/erreur.types';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

describe('formatRechercherSolutionDocumentTitle',
	() => {
		it('renvoie le titre fourni en ajoutant le nom du site si il n’y a pas d’erreur', () => {
			const titreRechercheFormate = formatRechercherSolutionDocumentTitle('ma page de recherche');

			expect(titreRechercheFormate).toEqual('ma page de recherche | 1jeune1solution');
		});

		it.each([
			[ErreurMetier.SERVICE_INDISPONIBLE, 'ma page de recherche - Service indisponible | 1jeune1solution'],
			[ErreurMetier.DEMANDE_INCORRECTE, 'ma page de recherche - Demande incorrecte | 1jeune1solution'],
		])('renvoie le titre avec suffixe approprié et le nom du site si il y a une erreur', (erreur: Erreur, titreAttendu: string) => {
			const titreRechercheFormate = formatRechercherSolutionDocumentTitle('ma page de recherche', erreur);

			expect(titreRechercheFormate).toEqual(titreAttendu);
		});
	},
);

