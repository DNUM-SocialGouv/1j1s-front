import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMétier } from '~/server/errors/erreurMétier.types';
import { aFormation } from '~/server/formations/domain/formation.fixture';
import { aFormationRepository } from '~/server/formations/domain/formation.repository.fixture';
import { aStatistiqueRepository } from '~/server/formations/domain/statistique.repository.fixture';
import {
	aFormationAvecCodeCertificationQuery,
	aFormationQuery,
} from '~/server/formations/infra/repositories/apiLaBonneAlternanceFormation.fixture';
import { ConsulterFormationUseCase } from '~/server/formations/useCases/consulterFormation.useCase';

describe('ConsulterFormationUseCase', () => {
	describe('handle', () => {
		describe('lorsque la formation n’existe pas', () => {
			it('retourne une erreur', async () => {
				// Given
				const formationRepository = aFormationRepository();
				(formationRepository.get as jest.Mock).mockResolvedValueOnce(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));

				const statistiqueRepository = aStatistiqueRepository();

				const filtres = aFormationQuery();

				// When
				const returnValue = await new ConsulterFormationUseCase(formationRepository, statistiqueRepository).handle('123', filtres);

				// Then
				expect(returnValue).toEqual({ formation: createFailure(ErreurMétier.SERVICE_INDISPONIBLE) });
				expect(formationRepository.get).toHaveBeenCalledWith('123', filtres);
				expect(statistiqueRepository.get).toHaveBeenCalledTimes(0);
			});
		});
		describe('lorsque la formation existe', () => {
			describe('lorsque le codeCertification n’est pas donné', () => {
				it('retourne la formation sans statistiques', async () => {
					// Given
					const formationRepository = aFormationRepository();
					(formationRepository.get as jest.Mock).mockResolvedValueOnce(createSuccess(aFormation()));

					const statistiqueRepository = aStatistiqueRepository();

					const filtres = aFormationAvecCodeCertificationQuery({ codeCertification: undefined });

					// When
					const returnValue = await new ConsulterFormationUseCase(formationRepository, statistiqueRepository).handle('123', filtres);

					// Then
					expect(returnValue).toEqual({ formation: createSuccess(aFormation()) });
					expect(formationRepository.get).toHaveBeenCalledWith('123', filtres);
					expect(statistiqueRepository.get).toHaveBeenCalledTimes(0);
				});
			});
			describe('lorsque la formation obtenu n’a pas de code postal', () => {
				it('retourne la formation sans statistiques', async () => {
					// Given
					const formation = {
						...aFormation(),
						adresse: {
							...aFormation().adresse,
							codePostal: undefined,
						},
					};
					const formationRepository = aFormationRepository();
					(formationRepository.get as jest.Mock).mockResolvedValueOnce(createSuccess(formation));

					const statistiqueRepository = aStatistiqueRepository();

					const filtres = aFormationQuery();

					// When
					const returnValue = await new ConsulterFormationUseCase(formationRepository, statistiqueRepository).handle('123', filtres);

					// Then
					expect(returnValue).toEqual({ formation: createSuccess(formation) });
					expect(formationRepository.get).toHaveBeenCalledWith('123', filtres);
					expect(statistiqueRepository.get).toHaveBeenCalledTimes(0);
				});
			});
			describe('lorsque le codeCertification est donné et que la formation obtenu contient un code postal', () => {
				describe('lorsque la statistique n’existe pas', () => {
					it('retourne la formation sans statistiques', async () => {
						// Given
						const formationRepository = aFormationRepository();
						(formationRepository.get as jest.Mock).mockResolvedValueOnce(createSuccess(aFormation()));

						const statistiqueRepository = aStatistiqueRepository();
						(statistiqueRepository.get as jest.Mock).mockResolvedValueOnce(createFailure(ErreurMétier.SERVICE_INDISPONIBLE));

						const filtres = aFormationAvecCodeCertificationQuery();

						// When
						const returnValue = await new ConsulterFormationUseCase(formationRepository, statistiqueRepository).handle('123', filtres);

						// Then
						expect(returnValue).toEqual({ formation: createSuccess(aFormation()) });
						expect(formationRepository.get).toHaveBeenCalledWith('123', filtres);
						expect(statistiqueRepository.get).toHaveBeenCalledWith('4567', aFormation().adresse.codePostal);
					});
				});
				describe('lorsque la statistique existe', () => {
					it('retourne la formation avec les statistiques', async () => {
						// Given
						const formationRepository = aFormationRepository();
						(formationRepository.get as jest.Mock).mockResolvedValueOnce(createSuccess(aFormation()));

						const statistique = {
							millesime: '2020-2021',
							region: 'Ile-de-France',
							tauxAutres6Mois: '23',
							tauxEnEmploi6Mois: '77',
							tauxEnFormation: '0',
						};
						const statistiqueRepository = aStatistiqueRepository();
						(statistiqueRepository.get as jest.Mock).mockResolvedValueOnce(createSuccess(statistique));

						const filtres = aFormationAvecCodeCertificationQuery();

						// When
						const returnValue = await new ConsulterFormationUseCase(formationRepository, statistiqueRepository).handle('123', filtres);

						// Then
						expect(returnValue).toEqual({
							formation: createSuccess(aFormation()),
							statistiques: createSuccess(statistique),
						});
						expect(formationRepository.get).toHaveBeenCalledWith('123', filtres);
						expect(statistiqueRepository.get).toHaveBeenCalledWith('4567', aFormation().adresse.codePostal);
					});
				});
			});
		});
	});
});
