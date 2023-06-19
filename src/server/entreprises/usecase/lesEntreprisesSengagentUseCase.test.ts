import { aCommandeRejoindreLaMobilisation, anEntreprise } from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';

describe('LesEntreprisesSEngagentUseCase', () => {
	let lEERepository: jest.Mocked<RejoindreLaMobilisationRepository>;
	let usecase: LesEntreprisesSEngagentUseCase;
	beforeEach(() => {
		lEERepository = {
			save: jest.fn().mockResolvedValue(createSuccess(undefined)),
		};

		usecase = new LesEntreprisesSEngagentUseCase(lEERepository);
	});
	describe('.rejoindreLaMobilisation(command)', () => {
		const commande = aCommandeRejoindreLaMobilisation();
		const entreprise = anEntreprise();

		describe('Quand tout est valide', () => {
			it('sauvegarde dans le dépôt', async () => {
				// When
				await usecase.rejoindreLaMobilisation(commande);
				// Then
				expect(lEERepository.save).toHaveBeenCalledWith(entreprise);
			});
			it('résout un succès', async () => {
				// When
				const actual = await usecase.rejoindreLaMobilisation(commande);
				// Then
				expect(actual).toEqual(createSuccess(undefined));
			});

			describe('Mais que le dépôt est indisponible', () => {
				beforeEach(() => {
					lEERepository.save.mockResolvedValue(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				});
				it('résout une erreur SERVICE INDISPONIBLE', async () => {
					// When
					const actual = await usecase.rejoindreLaMobilisation(commande);
					// Then
					expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
				});
			});
			describe('Mais que le dépôt juge la demande invalide', () => {
				beforeEach(() => {
					lEERepository.save.mockResolvedValue(createFailure(ErreurMétier.DEMANDE_INCORRECTE));
				});
				it('résout une erreur SERVICE INDISPONIBLE', async () => {
					// When
					const actual = await usecase.rejoindreLaMobilisation(commande);
					// Then
					expect(actual).toEqual(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));
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
