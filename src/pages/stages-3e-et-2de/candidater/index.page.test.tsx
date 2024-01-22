/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';
import { GetServerSidePropsContext } from 'next';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aStage3eEt2deService } from '~/client/services/stage3eEt2de/stage3eEt2de.service.fixture';
import Stages3eEt2deCandidaterPage, { getServerSideProps } from '~/pages/stages-3e-et-2de/candidater/index.page';
import { createFailure, createSuccess } from '~/server/errors/either';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';
import { ModeDeContact } from '~/server/stage-3e-et-2de/domain/candidatureStage3eEt2de';
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
			const { container } = render(
				<DependenciesProvider stage3eEt2deService={aStage3eEt2deService()}>
					<Stages3eEt2deCandidaterPage
						appellations={[
							{
								code: 'code',
								label: 'label',
							},
							{
								code: 'code2',
								label: 'label2',
							},
						]}
						modeDeContact={ModeDeContact.IN_PERSON}
						nomEntreprise="nomEntreprise"
						siret="siret"
					/>,
				</DependenciesProvider>,
			);

			expect(container.outerHTML).toHTMLValidate();
		});
		it('n‘a pas de défaut d‘accessibilité', () => {
			const { container } = render(
				<DependenciesProvider
					stage3eEt2deService={aStage3eEt2deService()}
				>
					<Stages3eEt2deCandidaterPage
						appellations={[
							{
								code: 'code',
								label: 'label',
							},
						]}
						modeDeContact={ModeDeContact.IN_PERSON}
						nomEntreprise="nomEntreprise"
						siret="siret"
					/>
				</DependenciesProvider>,
			);

			expect(container).toBeAccessible();
		});
	});
	describe('getServerSideProps', () => {
		describe('lorsque la feature n‘est pas activée', () => {
			it('retourne une page 404', async () => {
				// Given
				process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '0';
				const query = {};
				const context = { query } as GetServerSidePropsContext;

				// When
				const result = await getServerSideProps(context);

				// Then
				expect(result).toMatchObject({ notFound: true });
			});
		});

		describe('lorsque la feature est activée', () => {
			beforeEach(() => {
				process.env.NEXT_PUBLIC_STAGES_3EME_FEATURE = '1';
			});
			describe('lorsque la query est vide', () => {
				it('retourne une page 404', async () => {
					// Given
					const query = {};
					const context = { query } as GetServerSidePropsContext;

					// When
					const result = await getServerSideProps(context);

					// Then
					expect(result).toMatchObject({ notFound: true });
					expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).not.toHaveBeenCalled();
				});
			});
			describe('lorsque la query ne contient pas toutes les données nécessaires', () => {
				it('retourne une page 404', async () => {
					// Given
					const queryWithInvalidSiretType = {
						appellationCodes: 'appellationCodes',
						modeDeContact: 'IN_PERSON',
						nomEntreprise: 'nomEntreprise',
						siret: 1,
					};
					const context = { query: queryWithInvalidSiretType } as unknown as GetServerSidePropsContext;

					// When
					const result = await getServerSideProps(context);

					// Then
					expect(result).toMatchObject({ notFound: true });
					expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).not.toHaveBeenCalled();
				});
			});
			describe('lorsque la query est contient toutes les données nécessaires', () => {
				describe('lorsque la récupération des appellations échoue', () => {
					it('retourne une page 404', async () => {
						// Given
						jest.spyOn(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase, 'handle').mockResolvedValue(createFailure(ErreurMetier.SERVICE_INDISPONIBLE));
						const query = {
							appellationCodes: 'appellationCodes',
							modeDeContact: 'IN_PERSON',
							nomEntreprise: 'nomEntreprise',
							siret: 'siret',
						};
						const context = { query } as unknown as GetServerSidePropsContext;

						// When
						const result = await getServerSideProps(context);

						// Then
						expect(result).toMatchObject({ notFound: true });
						expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).toHaveBeenCalledWith(['appellationCodes']);
					});
				});
				describe('lorsque la récupération des appellations retourne un tableau vide', () => {
					it('retourne une page 404', async () => {
						// Given
						jest.spyOn(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase, 'handle').mockResolvedValue(createSuccess([]));
						const query = {
							appellationCodes: 'appellationCodes',
							modeDeContact: 'IN_PERSON',
							nomEntreprise: 'nomEntreprise',
							siret: 'siret',
						};
						const context = { query } as unknown as GetServerSidePropsContext;

						// When
						const result = await getServerSideProps(context);

						// Then
						expect(result).toMatchObject({ notFound: true });
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
						const query = {
							appellationCodes: 'appellationCodes',
							modeDeContact: 'IN_PERSON',
							nomEntreprise: 'nomEntreprise',
							siret: 'siret',
						};
						const context = { query } as unknown as GetServerSidePropsContext;

						// When
						const result = await getServerSideProps(context);

						// Then
						expect(result).toEqual({
							props: {
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
						});
						expect(dependencies.stage3eEt2deDependencies.recupererAppellationMetiersParAppellationCodesUseCase.handle).toHaveBeenCalledWith(['appellationCodes']);
					});
				});
			});
		});
	});
});
