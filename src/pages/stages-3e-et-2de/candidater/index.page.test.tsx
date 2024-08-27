/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import {
	aDonneesEntrepriseStage3eEt2de,
} from '~/client/components/features/Stages3eEt2de/Candidater/donneesEntreprise.fixture';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service.fixture';
import Stages3eEt2deCandidaterPage, { getServerSideProps } from '~/pages/stages-3e-et-2de/candidater/index.page';
import { aGetServerSidePropsContext } from '~/server/aGetServerSidePropsContext.fixture';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { dependencies } from '~/server/start';

jest.mock('~/server/start', () => ({
	dependencies: {
		stage3eEt2deDependencies: {
			recupererAppellationMetiersParAppellationCodesUseCase: {
				handle: jest.fn(),
			},
		},
	},
}));

describe('Page Candidater Stages 3e et 2de', () => {
	describe('La page doit être valide', () => {
		beforeEach(() => {
			process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '1';
			mockUseRouter({});
		});
		it('doit rendre du HTML respectant la specification', async () => {
			const donneesEntreprise = aDonneesEntrepriseStage3eEt2de();
			const { container } = render(
				<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
					<Stages3eEt2deCandidaterPage
						donneesEntreprise={donneesEntreprise} />,
				</DependenciesProvider>,
			);

			expect(container.outerHTML).toHTMLValidate();
		});
		it('n‘a pas de défaut d‘accessibilité', () => {
			const donneesEntreprise = aDonneesEntrepriseStage3eEt2de();
			const { container } = render(
				<DependenciesProvider
					stage3eEt2deService={aStage3eEt2deService()}>
					<Stages3eEt2deCandidaterPage
						donneesEntreprise={donneesEntreprise} />
				</DependenciesProvider>,
			);

			expect(container).toBeAccessible();
		});
	});
	describe('getServerSideProps', () => {
		describe('lorsque la feature n‘est pas activée', () => {
			it('retourne une page 404', async () => {
				process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '0';

				const result = await getServerSideProps(aGetServerSidePropsContext({}));

				expect(result).toMatchObject({ notFound: true });
			});
		});

		describe('lorsque la feature est activée', () => {
			beforeEach(() => {
				process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '1';
			});
			describe('lorsque la query est vide', () => {
				it('retourne en props une erreur Demande Incorrecte', async () => {
					// Given
					const defaultStatusCode = 200;
					const context = aGetServerSidePropsContext({ query: {}, res: { statusCode: defaultStatusCode } });

					// When
					const result = await getServerSideProps(context);

					// Then
					expect(result).toMatchObject({ props: { error: ErreurMetier.DEMANDE_INCORRECTE } });
					expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).not.toHaveBeenCalled();
				});
			});
			describe('lorsque la query ne contient pas toutes les données nécessaires', () => {
				it('retourne en props une erreur Demande Incorrecte', async () => {
					// Given
					const queryWithInvalidSiretType = {
						appellationCodes: 'appellationCodes',
						modeDeContact: 'IN_PERSON',
						nomEntreprise: 'nomEntreprise',
						siret: 1,
					};
					const defaultStatusCode = 200;
					const context = aGetServerSidePropsContext({
						// @ts-expect-error
						query: queryWithInvalidSiretType,
						res: { statusCode: defaultStatusCode },
					});

					// When
					const result = await getServerSideProps(context);

					// Then
					expect(result).toMatchObject({ props: { error: ErreurMetier.DEMANDE_INCORRECTE } });
					expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).not.toHaveBeenCalled();
				});
			});
			describe('lorsque la query est contient toutes les données nécessaires', () => {
				describe('lorsque la récupération des appellations échoue', () => {
					it('retourne en props une erreur Service Indisponible', async () => {
						// Given
						jest.spyOn(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase, 'handle').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
						const defaultStatusCode = 200;
						const context = aGetServerSidePropsContext({
							query: {
								appellationCodes: 'appellationCodes',
								modeDeContact: 'IN_PERSON',
								nomEntreprise: 'nomEntreprise',
								siret: 'siret',
							},
							res: { statusCode: defaultStatusCode },
						});

						// When
						const result = await getServerSideProps(context);

						// Then
						expect(result).toMatchObject({ props: { error: ErreurMetier.SERVICE_INDISPONIBLE } });
						expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).toHaveBeenCalledWith(['appellationCodes']);
					});
				});
				describe('lorsque la récupération des appellations retourne un tableau vide', () => {
					it('retourne en props une erreur Service Indisponible', async () => {
						// Given
						jest.spyOn(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase, 'handle').mockResolvedValue(createSuccess([]));
						const query = {
							appellationCodes: 'appellationCodes',
							modeDeContact: 'IN_PERSON',
							nomEntreprise: 'nomEntreprise',
							siret: 'siret',
						};
						const defaultStatusCode = 200;
						const context = aGetServerSidePropsContext({
							query,
							res: { statusCode: defaultStatusCode },
						});

						// When
						const result = await getServerSideProps(context);

						// Then
						expect(result).toMatchObject({ props: { error: ErreurMetier.SERVICE_INDISPONIBLE } });
						expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).toHaveBeenCalledWith(['appellationCodes']);
					});
				});
				describe('lorsque la récupération des appellations réussit', () => {
					it('retourne les props', async () => {
						// Given
						jest.spyOn(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase, 'handle').mockResolvedValue(createSuccess([
							{
								code: 'code',
								label: 'label',
							},
							{
								code: 'code2',
								label: 'label2',
							},
						]));
						const context = aGetServerSidePropsContext({
							query: {
								appellationCodes: 'appellationCodes',
								modeDeContact: 'IN_PERSON',
								nomEntreprise: 'nomEntreprise',
								siret: 'siret',
							},
						});

						// When
						const result = await getServerSideProps(context);

						// Then
						expect(result).toEqual({
							props: {
								donneesEntreprise: {
									appellations: [
										{
											code: 'code',
											label: 'label',
										},
										{
											code: 'code2',
											label: 'label2',
										},
									],
									modeDeContact: 'IN_PERSON',
									nomEntreprise: 'nomEntreprise',
									siret: 'siret',
								},
							},
						});
						expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).toHaveBeenCalledWith(['appellationCodes']);
					});
				});
			});
		});
	});
});
