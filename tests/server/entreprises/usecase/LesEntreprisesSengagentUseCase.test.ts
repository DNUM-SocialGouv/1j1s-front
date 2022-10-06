import { uneCommandeRejoindreLaMobilisation, uneEntreprise } from '@tests/fixtures/client/services/lesEntreprisesSEngagementService.fixture';

import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('LesEntreprisesSEngagentUseCase', () => {
  let primaryRepository: RejoindreLaMobilisationRepository;
  let secondaryRepository: RejoindreLaMobilisationRepository;
  let usecase: LesEntreprisesSEngagentUseCase;
  beforeEach(() => {
    primaryRepository = {
      save: jest.fn().mockResolvedValue(createSuccess(undefined)),
    };
    secondaryRepository = {
      save: jest.fn().mockResolvedValue(createSuccess(undefined)),
    };
    usecase = new LesEntreprisesSEngagentUseCase(primaryRepository, secondaryRepository);
  });
  describe('.rejoindreLaMobilisation(command)', () => {
    const commande = uneCommandeRejoindreLaMobilisation();
    const entreprise = uneEntreprise();

    describe('Quand tout est valide', () => {
      it('sauvegarde dans le dépôt primaire', async () => {
        // When
        await usecase.rejoindreLaMobilisation(commande);
        // Then
        expect(primaryRepository.save).toHaveBeenCalledWith(entreprise);
      });
      it('ne sauvegarde PAS dans le dépôt secondaire', async () => {
        // When
        await usecase.rejoindreLaMobilisation(commande);
        // Then
        expect(secondaryRepository.save).not.toHaveBeenCalled();
      });
      it('résoud un succès', async () => {
        // When
        const actual = await usecase.rejoindreLaMobilisation(commande);
        // Then
        expect(actual).toEqual(createSuccess(undefined));
      });

      describe('Mais que le dépôt primaire est indisponible', () => {
        beforeEach(() => {
          //@ts-ignore
          primaryRepository.save.mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
        });
        it('sauvegarde dans le dépôt secondaire', async () => {
          // When
          await usecase.rejoindreLaMobilisation(commande);
          // Then
          expect(secondaryRepository.save).toHaveBeenCalledWith(entreprise);
        });
        it('résoud un succès', async () => {
          // When
          const actual = await usecase.rejoindreLaMobilisation(commande);
          // Then
          expect(actual).toEqual(createSuccess(undefined));
        });

        describe('Mais que le dépôt il est pété aussi', () => {
          beforeEach(() => {
            //@ts-ignore
            secondaryRepository.save.mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
          });
          it('résoud une erreur SERVICE INDISPONIBLE', async () => {
            // When
            const actual = await usecase.rejoindreLaMobilisation(commande);
            // Then
            expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
          });
        });
        describe('Mais que le dépôt secondaire juge la demande invalide', () => {
          // FIXME comme on a aucun moyen de faire remonter l'information jusqu'à l'utilisateur
          // on va considérer ici qu'on ne sait pas gérer cette erreur
          beforeEach(() => {
            //@ts-ignore
            secondaryRepository.save.mockResolvedValue(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
          });
          it('résoud une erreur SERVICE INDISPONIBLE', async () => {
            // When
            const actual = await usecase.rejoindreLaMobilisation(commande);
            // Then
            expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
          });
        });
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
      { codePostal: 'bonjour' },
      { codePostal: '27B' },
      { codePostal: '123456' },
      { codePostal: '97000' },
      { codePostal: '97700' },
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

/*
type FnStub<F extends () => any> = jest.Mock<Parameters<F>, ReturnType<F>>
type Stub<C extends Record<string, () => any>> = Record<keyof C, FnStub<C[keyof C]>>
function Stub<C extends Record<string, () => any>> (impl: Partial<C>): Stub<C> {
  const stubs: Partial<Stub<C>> = {};
  const proxy = new Proxy(impl, {
    get(target: Partial<C>, key: keyof C): FnStub<C[typeof prop]> {
      if (key in stubs) {
        return stubs[key]!;
      }
      if (key in impl) {
        stubs[key] = jest.fn(impl[key])
      }
    },
  });
}

*/
