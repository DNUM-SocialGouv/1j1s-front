import { anEntrepriseSouhaitantSEngager } from '~/client/services/lesEntreprisesSEngagent/lesEntreprisesSEngagentService.fixture';
import { RejoindreLaMobilisationRepository } from '~/server/entreprises/domain/RejoindreLaMobilisation.repository';
import { LesEntreprisesSEngagentUseCase } from '~/server/entreprises/usecase/lesEntreprisesSEngagentUseCase';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

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
		const entreprise = anEntrepriseSouhaitantSEngager();

		describe('Quand tout est valide', () => {
			it('sauvegarde dans le dépôt', async () => {
				// When
				await usecase.rejoindreLaMobilisation(anEntrepriseSouhaitantSEngager());
				// Then
				expect(lEERepository.save).toHaveBeenCalledWith(entreprise);
			});
			it('résout un succès', async () => {
				// When
				const actual = await usecase.rejoindreLaMobilisation(anEntrepriseSouhaitantSEngager());
				// Then
				expect(actual).toEqual(createSuccess(undefined));
			});

			describe('Mais que le dépôt renvoie une erreur métier', () => {
				beforeEach(() => {
					lEERepository.save.mockResolvedValue(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				});
				it('résout cette erreur métier', async () => {
					// When
					const actual = await usecase.rejoindreLaMobilisation(anEntrepriseSouhaitantSEngager());
					// Then
					expect(actual).toEqual(createFailure(ErreurMetier.DEMANDE_INCORRECTE));
				});
			});
		});
	});
});
