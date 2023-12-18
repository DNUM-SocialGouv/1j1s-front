import { anHttpClientService } from '~/client/services/httpClientService.fixture';
import {
	LesEntreprisesSEngagentService,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagent.service';
import {
	anEntrepriseSouhaitantSEngager,
} from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

describe('LesEntreprisesSEngagentService', () => {
	describe('l’envoie du formulaire c’est bien passé', () => {
		it('renvoie un Success', async () => {
			const httpClientService = anHttpClientService();
			jest.spyOn(httpClientService, 'post').mockResolvedValue(createSuccess(undefined));
			const lesEntreprisesSEngagentServiceService = new LesEntreprisesSEngagentService(httpClientService);

			const result = await lesEntreprisesSEngagentServiceService.envoyerFormulaireEngagement(anEntrepriseSouhaitantSEngager({
				codePostal: '75002',
				email: 'email@octo.com',
				nom: 'Toto',
				nomSociété: 'Octo',
				prénom: 'Tata',
				secteur: 'Dev',
				siret: '123456789123',
				taille: '~ 1000',
				travail: 'Dev',
				téléphone: '0611223344',
				ville: 'Maison-Alfort',
			}));

			expect(httpClientService.post).toHaveBeenCalledWith('entreprises', {
				codePostal: '75002',
				email: 'email@octo.com',
				nom: 'Toto',
				nomSociété: 'Octo',
				prénom: 'Tata',
				secteur: 'Dev',
				siret: '123456789123',
				taille: '~ 1000',
				travail: 'Dev',
				téléphone: '0611223344',
				ville: 'Maison-Alfort',
			});
			expect(result).toEqual(createSuccess(undefined));
		});
	});

	describe('l’envoie du formulaire tombe en erreur', () => {
		it('renvoie une Failure', async () => {
			const httpClientService = anHttpClientService();
			jest.spyOn(httpClientService, 'post').mockResolvedValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
			const lesEntreprisesSEngagentServiceService = new LesEntreprisesSEngagentService(httpClientService);

			const result = await lesEntreprisesSEngagentServiceService.envoyerFormulaireEngagement(anEntrepriseSouhaitantSEngager({
				codePostal: '75002',
				email: 'email@octo.com',
				nom: 'Toto',
				nomSociété: 'Octo',
				prénom: 'Tata',
				secteur: 'Dev',
				siret: '123456789123',
				taille: '~ 1000',
				travail: 'Dev',
				téléphone: '0611223344',
				ville: 'Maison-Lafitte',
			}));
			expect(result).toEqual(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
		});
	});
});
