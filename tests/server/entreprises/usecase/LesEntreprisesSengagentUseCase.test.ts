import { uneCommandeRejoindreLaMobilisation, uneEntreprise } from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';

import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('LesEntreprisesSEngagentUseCase', () => {
  let repository: RejoindreLaMobilisationRepository;
  let usecase: LesEntreprisesSEngagentUseCase;
  beforeEach(() => {
    repository = {
      save: jest.fn().mockResolvedValue(createSuccess(undefined)),
    };
    usecase = new LesEntreprisesSEngagentUseCase(repository);
  });
  describe('.rejoindreLaMobilisation(command)', () => {
    const commande = uneCommandeRejoindreLaMobilisation();
    const entreprise = uneEntreprise();
    describe('Quand tout est valide', () => {
      it('sauvegarde dans le dépôt', async () => {
        // When
        await usecase.rejoindreLaMobilisation(commande);
        // Then
        expect(repository.save).toHaveBeenCalledWith(entreprise);
      });
      it('résoud un succès', async () => {
        // When
        const actual = await usecase.rejoindreLaMobilisation(commande);
        // Then
        expect(actual).toEqual(createSuccess(undefined));
      });
    });
    describe("quand le téléphone n'est pas valide", () => {
      it('résous une erreur DEMANDE_INCORRECTE', async () => {
        // Given
        const commandeInvalide = {
          ...commande,
          téléphone: 'coucou',
        };
        // When
        const actual = await usecase.rejoindreLaMobilisation(commandeInvalide);
        // Then
        expect(actual).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
      });
    });
    const invalidFields = [
      { téléphone: 'RTYHFYUIJN' },
      { téléphone: '555-2341-111' },
      { email: 'toto chez msn' },
      { email: '' },
      { nomSociété: '' },
      { siret: '' },
      { siret: 'coucou bonjour' },
      { siret: '3456765' },
      { codePostal: '' },
      { secteur: 'pas un secteur' },
      { secteur: '' },
      { taille: '8' },
      { taille: '' },
      { ville: '' },
      { prénom: '' },
      { nom: '' },
      { travail: '' },
    ];
    for (const invalid of invalidFields) {
      describe(`mais avec ${JSON.stringify(invalid)}`, () => {
        it('résoud une Failure', async () => {
          // Given
          const commandeInvalide = { ...commande, ...invalid };
          // When
          const actual = await usecase.rejoindreLaMobilisation(commandeInvalide);
          // Then
          expect(actual).toEqual(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
        });
      });
    }
  });
});
