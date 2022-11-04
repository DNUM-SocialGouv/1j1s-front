import { DemandeDeContactCEJ } from '~/server/demande-de-contact/domain/DemandeDeContact';
import { EnvoyerDemandeDeContactCEJUseCase } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactCEJ.usecase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('EnvoyerDemandeDeContact pour le CEJ', () => {
  describe('.handle(command)', () => {
    const command = {
      age: 18,
      codePostal: '95000',
      email: 'toto@msn.fr',
      nom: 'Mc Totface',
      prénom: 'Toto',
      téléphone: '0678954322',
      ville: 'Cergy',
    };

    describe('quand la command ne contient aucun champ', () => {
      it('résout une DEMANDE_INCORRECTE', async () => {
        // Given
        const repository = {
          saveCEJ: jest.fn(),
          saveEntreprise: jest.fn(),
          savePOE: jest.fn(),
        };
        const usecase = new EnvoyerDemandeDeContactCEJUseCase(repository);

        // When
        const result = await usecase.handle({});

        // Then
        expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      });
    });

    it('appelle le repository', async () => {
      // Given
      const repository = {
        saveCEJ: jest.fn(() => Promise.resolve(createSuccess(undefined))),
        saveEntreprise: jest.fn(),
        savePOE: jest.fn(),
      };
      const usecase = new EnvoyerDemandeDeContactCEJUseCase(repository);
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
      expect(repository.saveCEJ).toHaveBeenCalledWith(demandeDeContactCEJ);
      expect(result).toEqual(createSuccess(undefined));
    });
    it('appelle le repository même avec un téléphone fixe', async () => {
      // Given
      const repository = {
        saveCEJ: jest.fn(() => Promise.resolve(createSuccess(undefined))),
        saveEntreprise: jest.fn(),
        savePOE: jest.fn(),
      };
      const usecase = new EnvoyerDemandeDeContactCEJUseCase(repository);
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
      expect(repository.saveCEJ).toHaveBeenCalledWith(demandeDeContactCEJ);
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
          const repository = {
            saveCEJ: jest.fn(() => Promise.resolve(createSuccess(undefined))),
            saveEntreprise: jest.fn(),
            savePOE: jest.fn(),
          };
          const usecase = new EnvoyerDemandeDeContactCEJUseCase(repository);
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
