import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapiCms.repository.fixture';
import { DemandeDeContactCEJ } from '~/server/demande-de-contact/domain/demandeDeContact';
import {
	DemandeDeContactCEJRepository,
} from '~/server/demande-de-contact/infra/repositories/cej/demandeDeContactCEJ.repository';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('DemandeDeContactCEJRepository', () => {
	describe('envoyer', () => {
		const demandeDeContactCEJ: DemandeDeContactCEJ = {
			age: 18,
			codeCommune: '75001',
			email: 'test@test.com',
			nom: 'Test',
			nomCommune: 'Paris',
			prénom: 'TEST',
			téléphone: '0123456789',
		};

		it('envoie la demande au CMS', async () => {
			// Given
			const strapiCmsRepository = aStrapiCmsRepository();
			const repository = new DemandeDeContactCEJRepository(strapiCmsRepository);
			const expectedBody = {
				age: 18,
				code_postal: '75001',
				email: 'test@test.com',
				nom: 'Test',
				prenom: 'TEST',
				telephone: '0123456789',
				ville: 'Paris',
			};
			// When
			const result = await repository.envoyer(demandeDeContactCEJ);
			// Then
			expect(result).toEqual(createSuccess(undefined));
			expect(strapiCmsRepository.save).toHaveBeenCalledWith('contact-cejs', expectedBody);
		});

		describe('Quand la requête HTTP échoue', () => {
			it('Résout une Failure', async () => {
				// Given
				const strapiCmsRepository = aStrapiCmsRepository();
				const repository = new DemandeDeContactCEJRepository(strapiCmsRepository);
				jest.spyOn(strapiCmsRepository, 'save').mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				// When
				const result = await repository.envoyer(demandeDeContactCEJ);
				// Then
				expect(result).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
			});
		});
	});
});
