import { DemandeDeContactEntreprise } from '~/server/demande-de-contact/domain/demandeDeContact';
import { DemandeDeContactRepository } from '~/server/demande-de-contact/domain/demandeDeContact.repository';
import { EnvoyerDemandeDeContactEntrepriseUseCase } from '~/server/demande-de-contact/useCases/envoyerDemandeDeContactEntreprise.usecase';
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
    
    const demandeDeContactRepository = {
      envoyer: jest.fn().mockResolvedValue(createSuccess(undefined)),
    } as unknown as DemandeDeContactRepository;

    describe('quand la command ne contient aucun champ', () => {
      it('résout une DEMANDE_INCORRECTE', async () => {
        // Given
        const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactRepository);

        // When
        const result = await envoyerDemanderDeContactEntrepriseUseCase.handle({});

        // Then
        expect(result).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      });
    });

    it('appelle le repository', async () => {
      // Given
      const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactRepository);
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
      expect(demandeDeContactRepository.envoyer).toHaveBeenCalledWith(demandeDeContactEntreprise);
      expect(result).toEqual(createSuccess(undefined));
    });

    it('appelle le repository même avec un téléphone fixe', async () => {
      // Given
      const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactRepository);
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
      expect(demandeDeContactRepository.envoyer).toHaveBeenCalledWith(demandeDeContactEntreprise);
      expect(result).toEqual(createSuccess(undefined));
    });

    const invalidFields = [
      { email: 'toto chez msn' },
      { téléphone: 'RTYHFYUIJN' },
      { téléphone: '555-2341-111' },
    ];
    for (const invalid of invalidFields) {
      describe(`mais avec ${JSON.stringify(invalid)}`, () => {
        it('résout une Failure', async () => {
          // Given
          const envoyerDemanderDeContactEntrepriseUseCase = new EnvoyerDemandeDeContactEntrepriseUseCase(demandeDeContactRepository);
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
