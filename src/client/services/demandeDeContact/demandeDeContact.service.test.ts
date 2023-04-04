import { DemandeDeContactService } from '~/client/services/demandeDeContact/demandeDeContact.service';
import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('DemandeDeContactService', () => {
	describe('.envoyerPourLeCEJ()', () => {
		it('appelle l‘API avec les paramètres du formulaire de contact et retourne un success', async () => {
			// Given
			const httpClientService = anHttpClientService();
			jest.spyOn(httpClientService,'post').mockResolvedValue(createSuccess(undefined));
			const demandeContactService = new DemandeDeContactService(httpClientService);
			const body = {
				age: 18,
				codePostal: '95000',
				email: 'toto@msn.fr',
				nom: 'Mc Totface',
				prénom: 'Toto',
				téléphone: '0678954322',
				ville: 'Cergy',
			};

			// When
			const result = await demandeContactService.envoyerPourLeCEJ(body);

			// Then
			expect(result).toEqual(createSuccess(undefined));
			expect(httpClientService.post).toHaveBeenCalledWith('demandes-de-contact', { ...body, type: 'CEJ' });
		});

		it('appelle API avec les paramètres du formulaire de contact et retourne une Failure', async () => {
			// Given
			const httpClientService = anHttpClientService();
			jest.spyOn(httpClientService,'post').mockResolvedValue(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
			const demandeContactService = new DemandeDeContactService(httpClientService);
			const body = {
				age: 18,
				codePostal: '95000',
				email: 'toto@msn.fr',
				nom: 'Mc Totface',
				prénom: 'Toto',
				téléphone: '0678954',
				ville: 'Cergy',
			};

			// When
			const result = await demandeContactService.envoyerPourLeCEJ(body);

			// Then
			expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
			expect(httpClientService.post).toHaveBeenCalledWith('demandes-de-contact', { ...body, type: 'CEJ' });
		});
	});
});
