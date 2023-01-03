import { DemandeDeContactCEJ } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { EnvoyerDemandeDeContactCEJUseCase } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('EnvoyerDemandeDeContact pour le CEJ', () => {
	describe('.handle(command)', () => {
		const command = {
			age: 18,
			codeCommune: '95000',
			email: 'toto@msn.fr',
			nom: 'Mc Totface',
			nomCommune: 'Cergy',
			prénom: 'Toto',
			téléphone: '0678954322',
		};
    
		const demandeDeContactRepository = {
			envoyer: jest.fn().mockResolvedValue(createSuccess(undefined)),
		} as unknown as DemandeDeContactRepository;

		describe('quand la command ne contient aucun champ', () => {
			it('résout une DEMANDE_INCORRECTE', async () => {
				// Given
				const usecase = new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactRepository);

				// When
				const result = await usecase.handle({});

				// Then
				expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
			});
		});

		it('appelle le repository', async () => {
			// Given
			const usecase = new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactRepository);
			const demandeDeContactCEJ: DemandeDeContactCEJ = {
				age: 18,
				codeCommune: '95000',
				email: 'toto@msn.fr',
				nom: 'Mc Totface',
				nomCommune: 'Cergy',
				prénom: 'Toto',
				téléphone: '+33678954322',
			};
			// When
			const result = await usecase.handle(command);
			// Then
			expect(demandeDeContactRepository.envoyer).toHaveBeenCalledWith(demandeDeContactCEJ);
			expect(result).toEqual(createSuccess(undefined));
		});
		it('appelle le repository même avec un téléphone fixe', async () => {
			// Given
			const usecase = new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactRepository);
			const demandeDeContactCEJ: DemandeDeContactCEJ = {
				age: 18,
				codeCommune: '95000',
				email: 'toto@msn.fr',
				nom: 'Mc Totface',
				nomCommune: 'Cergy',
				prénom: 'Toto',
				téléphone: '+33123456789',
			};
			// When
			const result = await usecase.handle({ ...command, téléphone: '0123456789' });
			// Then
			expect(demandeDeContactRepository.envoyer).toHaveBeenCalledWith(demandeDeContactCEJ);
			expect(result).toEqual(createSuccess(undefined));
		});

		const invalidFields = [
			{ email: 'toto chez msn' },
			{ age: 12 },
			{ téléphone: 'RTYHFYUIJN' },
			{ téléphone: '555-2341-111' },
		];
		for (const invalid of invalidFields) {
			describe(`mais avec ${JSON.stringify(invalid)}`, () => {
				it('résout une Failure', async () => {
					// Given
					const usecase = new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactRepository);
					const commandeInvalide = { ...command, ...invalid };
					// When
					const result = await usecase.handle(commandeInvalide);
					// Then
					expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
				});
			});
		}
	});
});
