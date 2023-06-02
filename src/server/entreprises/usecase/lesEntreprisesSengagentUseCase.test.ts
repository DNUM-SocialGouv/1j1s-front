import { aCommandeRejoindreLaMobilisation, anEntreprise } from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { StrapiRepository } from '~/server/cms/infra/repositories/strapi.repository';
import { aStrapiCmsRepository } from '~/server/cms/infra/repositories/strapi.repository.fixture';
import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('LesEntreprisesSEngagentUseCase', () => {
	let primaryRepository: jest.Mocked<RejoindreLaMobilisationRepository>;
	let secondaryRepository: StrapiRepository;
	let usecase: LesEntreprisesSEngagentUseCase;
	beforeEach(() => {
		primaryRepository = {
			save: jest.fn().mockResolvedValue(createSuccess(undefined)),
		};
		secondaryRepository = aStrapiCmsRepository({
			saveEntrepriseRejoindreLaMobilisation: jest.fn().mockResolvedValue(createSuccess(undefined)),
		});

		usecase = new LesEntreprisesSEngagentUseCase(primaryRepository, secondaryRepository);
	});
	describe('.rejoindreLaMobilisation(command)', () => {
		const commande = aCommandeRejoindreLaMobilisation();
		const entreprise = anEntreprise();

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
			it('résout un succès', async () => {
				// When
				const actual = await usecase.rejoindreLaMobilisation(commande);
				// Then
				expect(actual).toEqual(createSuccess(undefined));
			});

			describe('Mais que le dépôt primaire est indisponible', () => {
				beforeEach(() => {
					primaryRepository.save.mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				});
				it('sauvegarde dans le dépôt secondaire', async () => {
					// When
					await usecase.rejoindreLaMobilisation(commande);
					// Then
					expect(secondaryRepository.saveEntrepriseRejoindreLaMobilisation).toHaveBeenCalledWith(entreprise, ErreurMétier.SERVICE_INDISPONIBLE);
				});
				it('résout un succès', async () => {
					// When
					const actual = await usecase.rejoindreLaMobilisation(commande);
					// Then
					expect(actual).toEqual(createSuccess(undefined));
				});

				describe('et que le deuxième dépot ne fonctionne pas', () => {
					beforeEach(() => {
						jest.spyOn(secondaryRepository, 'saveEntrepriseRejoindreLaMobilisation' ).mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
					});
					it('résout une erreur SERVICE INDISPONIBLE', async () => {
						// When
						const actual = await usecase.rejoindreLaMobilisation(commande);
						// Then
						expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
					});
				});
			});
			describe('Mais que le dépôt primaire juge la demande invalide', () => {
				// FIXME comme on a aucun moyen de faire remonter s‘information jusqu'à s‘utilisateur
				// on va considérer ici qu'on ne sait pas gérer cette erreur
				beforeEach(() => {
					primaryRepository.save.mockResolvedValue(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
				});
				it('sauvegarde dans le dépôt secondaire', async () => {
					// When
					await usecase.rejoindreLaMobilisation(commande);
					// Then
					expect(secondaryRepository.saveEntrepriseRejoindreLaMobilisation).toHaveBeenCalledWith(entreprise, ErreurMétier.DEMANDE_INCORRECTE);
				});
				it('résout un succès', async () => {
					// When
					const actual = await usecase.rejoindreLaMobilisation(commande);
					// Then
					expect(actual).toEqual(createSuccess(undefined));
				});
			});
		});

		describe('quand le téléphone n‘est pas valide', () => {
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
				it('résout une Failure', async () => {
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
