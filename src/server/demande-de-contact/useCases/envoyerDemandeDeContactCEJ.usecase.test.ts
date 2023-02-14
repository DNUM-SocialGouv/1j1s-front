import { DemandeDeContactCEJ } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import {
	EnvoyerDemandeDeContactCEJUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';


describe('EnvoyerDemandeDeContact pour le CEJ', () => {
	describe('.handle(command)', () => {
		const command: DemandeDeContactCEJ = {
			age: 18,
			codePostal: '95000',
			email: 'toto@msn.fr',
			nom: 'Mc Totface',
			prénom: 'Toto',
			téléphone: '0678954322',
			ville: 'Cergy',
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
				codePostal: '95000',
				email: 'toto@msn.fr',
				nom: 'Mc Totface',
				prénom: 'Toto',
				téléphone: '+33678954322',
				ville: 'Cergy',
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
				codePostal: '95000',
				email: 'toto@msn.fr',
				nom: 'Mc Totface',
				prénom: 'Toto',
				téléphone: '+33123456789',
				ville: 'Cergy',
			};
			// When
			const result = await usecase.handle({ ...command, téléphone: '0123456789' });
			// Then
			expect(demandeDeContactRepository.envoyer).toHaveBeenCalledWith(demandeDeContactCEJ);
			expect(result).toEqual(createSuccess(undefined));
		});

		describe('Quand les champs ne respectent pas le schema de validation', () => {
			it.each([
				{ email: 'toto chez msn' },
				{ age: 12 },
				{ age: 35 },
				{ téléphone: 'RTYHFYUIJN' },
				{ téléphone: '555-2341-111' },
			])('pour %j on retourne une erreur', async (queryParametersToTestInError) => {
				const usecase = new EnvoyerDemandeDeContactCEJUseCase(demandeDeContactRepository);
				const result = await usecase.handle({ ...command, ...queryParametersToTestInError } as unknown as DemandeDeContactCEJ);

				expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
			});
		});
	});
});
