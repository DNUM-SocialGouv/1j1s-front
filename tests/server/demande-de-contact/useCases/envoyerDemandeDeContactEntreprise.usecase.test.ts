import { DemandeDeContactEntreprise } from '~/server/demande-de-contact/domain/DemandeDeContact';
import {
  EnvoyerDemanderDeContactEntrepriseUseCase,
} from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('EnvoyerDemanderDeContact pour la partie Entreprise', () => {
  describe('.handle(command)', () => {
    const command = {
      email: 'toto@msn.fr',
      message: 'rhrh',
      nom: 'Mc Totface',
      prénom: 'Toto',
      sujet: 'rrr',
      téléphone: '0678954322',
    };

    describe('quand la command ne contient aucun champ', () => {
      it('résoud une DEMANDE_INCORRECTE', async () => {
        // Given
        const repository = {
          saveCEJ: jest.fn(),
          saveEntreprise: jest.fn(),
        };
        const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemanderDeContactEntrepriseUseCase(repository);

        // When
        const result = await envoyerDemanderDeContactEntrepriseUseCase.handle({});

        // Then
        expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      });
    });

    it('appelle le repository', async () => {
      // Given
      const repository = {
        saveCEJ: jest.fn(),
        saveEntreprise: jest.fn(() => Promise.resolve(createSuccess(undefined))),
      };
      const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemanderDeContactEntrepriseUseCase(repository);
      const demandeDeContactEntreprise: DemandeDeContactEntreprise = {
        email: 'toto@msn.fr',
        message: 'rhrh',
        nom: 'Mc Totface',
        prénom: 'Toto',
        sujet: 'rrr',
        téléphone: '+33678954322',
      };
      // When
      const result = await envoyerDemanderDeContactEntrepriseUseCase.handle(command);
      // Then
      expect(repository.saveEntreprise).toHaveBeenCalledWith(demandeDeContactEntreprise);
      expect(result).toEqual(createSuccess(undefined));
    });

    it('appelle le repository même avec un téléphone fixe', async () => {
      // Given
      const repository = {
        saveCEJ: jest.fn(),
        saveEntreprise: jest.fn(() => Promise.resolve(createSuccess(undefined))),
      };
      const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemanderDeContactEntrepriseUseCase(repository);
      const demandeDeContactEntreprise: DemandeDeContactEntreprise = {
        email: 'toto@msn.fr',
        message: 'rhrh',
        nom: 'Mc Totface',
        prénom: 'Toto',
        sujet: 'rrr',
        téléphone: '+33123456789',
      };
      // When
      const result = await envoyerDemanderDeContactEntrepriseUseCase.handle({ ...command, téléphone: '0123456789' });
      // Then
      expect(repository.saveEntreprise).toHaveBeenCalledWith(demandeDeContactEntreprise);
      expect(result).toEqual(createSuccess(undefined));
    });

    const invalidFields = [
      { email: 'toto chez msn' },
      { téléphone: 'RTYHFYUIJN' },
      { téléphone: '555-2341-111' },
    ];
    for (const invalid of invalidFields) {
      describe(`mais avec ${JSON.stringify(invalid)}`, () => {
        it('résoud une Failure', async () => {
          // Given
          const repository = {
            saveCEJ: jest.fn(),
            saveEntreprise: jest.fn(() => Promise.resolve(createSuccess(undefined))),
          };
          const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemanderDeContactEntrepriseUseCase(repository);
          const commandeInvalide = { ...command, ...invalid };
          // When
          const result = await envoyerDemanderDeContactEntrepriseUseCase.handle(commandeInvalide);
          // Then
          expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
        });
      });
    }
  });
});
