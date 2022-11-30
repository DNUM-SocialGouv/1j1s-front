import { DemandeDeContactPOE } from '~/server/demande-de-contact/domain/DemandeDeContact';
import { EnvoyerDemandeDeContactPOEUsecase } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactPOE.usecase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('EnvoyerDemanderDeContact pour le POE', () => {
  describe('.handle(command)', () => {
    const command = {
      codePostal: '75001',
      commentaire: 'Coucou un commentaire',
      email: 'test@test.com',
      nom: 'TEST',
      nomSociété: 'Société de test',
      nombreARecruter: '5',
      prénom: 'Test',
      secteur: 'agriculture',
      siret: '12345678901234',
      taille: 'small',
      travail: 'Assistance téléphonique',
      téléphone: '0623456789',
      ville: 'Paris',
    };

    describe('quand la command ne contient aucun champ', () => {
      it('résout une DEMANDE_INCORRECTE', async () => {
        // Given
        const repository = {
          saveCEJ: jest.fn(),
          saveEntreprise: jest.fn(),
          savePOE: jest.fn(),
        };
        const usecase = new EnvoyerDemandeDeContactPOEUsecase(repository);

        // When
        const result = await usecase.handle({});

        // Then
        expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      });
    });

    it('appelle le repository', async () => {
      // Given
      const repository = {
        saveCEJ: jest.fn(),
        saveEntreprise: jest.fn(),
        savePOE: jest.fn(() => Promise.resolve(createSuccess(undefined))),
      };
      const usecase = new EnvoyerDemandeDeContactPOEUsecase(repository);
      const demandeDeContactPOE: DemandeDeContactPOE = {
        codePostal: '75001',
        commentaire: 'Coucou un commentaire',
        email: 'test@test.com',
        nom: 'TEST',
        nomSociété: 'Société de test',
        nombreARecruter: '5',
        prénom: 'Test',
        secteur: 'agriculture',
        siret: '12345678901234',
        taille: 'small',
        travail: 'Assistance téléphonique',
        téléphone: '+33623456789',
        ville: 'Paris',
      };
      // When
      const result = await usecase.handle(command);
      // Then
      expect(repository.savePOE).toHaveBeenCalledWith(demandeDeContactPOE);
      expect(result).toEqual(createSuccess(undefined));
    });

    it('appelle le repository même avec un téléphone fixe', async () => {
      // Given
      const repository = {
        saveCEJ: jest.fn(),
        saveEntreprise: jest.fn(),
        savePOE: jest.fn(() => Promise.resolve(createSuccess(undefined))),
      };
      const usecase = new EnvoyerDemandeDeContactPOEUsecase(repository);
      const demandeDeContactPOE: DemandeDeContactPOE = {
        codePostal: '75001',
        commentaire: 'Coucou un commentaire',
        email: 'test@test.com',
        nom: 'TEST',
        nomSociété: 'Société de test',
        nombreARecruter: '5',
        prénom: 'Test',
        secteur: 'agriculture',
        siret: '12345678901234',
        taille: 'small',
        travail: 'Assistance téléphonique',
        téléphone: '+33123456789',
        ville: 'Paris',
      };
      // When
      const result = await usecase.handle({ ...command, téléphone: '0123456789' });
      // Then
      expect(repository.savePOE).toHaveBeenCalledWith(demandeDeContactPOE);
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
            saveCEJ: jest.fn(),
            saveEntreprise: jest.fn(),
            savePOE: jest.fn(() => Promise.resolve(createSuccess(undefined))),
          };
          const usecase = new EnvoyerDemandeDeContactPOEUsecase(repository);
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
