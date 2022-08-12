import { DemandeDeContact } from '~/server/contrat-engagement-jeune/domain/DemandeDeContact';
import {
  EnvoyerDemanderDeContactUseCase,
} from '~/server/contrat-engagement-jeune/usecase/envoyerDemandeDeContact.usecase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('EnvoyerDemanderDeContact', () => {
  describe('.handle(command)', () => {
    const command = {
      age: 18,
      email: 'toto@msn.fr',
      nom: 'Mc Totface',
      prénom: 'Toto',
      téléphone: '0678954322',
      ville: 'Cergy',
    };

    describe('quand la command ne contient aucun champ', () => {
      it('résoud une DEMANDE_INCORRECTE', async () => {
        // Given
        const repository = { save: jest.fn() };
        const usecase = new EnvoyerDemanderDeContactUseCase(repository);

        // When
        const result = await usecase.handle({});

        // Then
        expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      });
    });

    it('appelle le repository', async () => {
      // Given
      const repository = {
        save: jest.fn(() => Promise.resolve(createSuccess(undefined))),
      };
      const usecase = new EnvoyerDemanderDeContactUseCase(repository);
      const demandeDeContact: DemandeDeContact = {
        age: 18,
        email: 'toto@msn.fr',
        nom: 'Mc Totface',
        prénom: 'Toto',
        téléphone: '+33678954322',
        ville: 'Cergy',
      };
      // When
      const result = await usecase.handle(command);
      // Then
      expect(repository.save).toHaveBeenCalledWith(demandeDeContact);
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
        it('résoud une Failure', async () => {
          // Given
          const repository = {
            save: jest.fn(() => Promise.resolve(createSuccess(undefined))),
          };
          const usecase = new EnvoyerDemanderDeContactUseCase(repository);
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
