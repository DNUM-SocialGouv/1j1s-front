/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	RechercherSolutionLayoutWithTabs,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayoutWithTabs';
import { mockUseRouter } from '~/client/components/useRouter.mock';

describe('RechercherSolutionLayoutWithTabs', () => {
	beforeEach(() => {
		mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });
	});

	describe('je vois le nombre de résultat', () => {
		it('lorsqu‘il y a des résultats, je vois le message du résultat de recherche associé au premier onglet', () => {
			const listSolutionElementTab = [{
				label: 'tab1',
				listeSolutionElement: <></>,
				messageResultatRecherche: '3 résultats pour tab1',
				nombreDeSolutions: 1,
			},
			{
				label: 'tab2',
				listeSolutionElement: <></>,
				messageResultatRecherche: '2 résultats pour tab2',
				nombreDeSolutions: 1,
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				listeSolutionElementTab={listSolutionElementTab}
				isLoading={false}/>);

			expect(screen.getByText('3 résultats pour tab1')).toBeVisible();
		});

		it('lorsque les query params continenent l’onglet, je vois les résultats de l‘onglet correspondant', () => {
			mockUseRouter({ query: { tab: '1' } });
			const listSolutionElementTab = [{
				label: 'tab1',
				listeSolutionElement: <></>,
				messageResultatRecherche: '3 résultats pour tab1',
				nombreDeSolutions: 1,
			},
			{
				label: 'tab2',
				listeSolutionElement: <></>,
				messageResultatRecherche: '2 résultats pour tab2',
				nombreDeSolutions: 1,
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				listeSolutionElementTab={listSolutionElementTab}
				isLoading={false}/>);

			expect(screen.getByText('2 résultats pour tab2')).toBeVisible();
		});

		it('lorsqu‘il n‘y a pas de résulat, je vois le message par défaut qui m‘explique qu‘aucun résultat a été trouvé', () => {
			const listSolutionElementTab = [{
				label: 'tab1',
				listeSolutionElement: <></>,
				messageResultatRecherche: '3 résultats pour tab1',
				nombreDeSolutions: 0,
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				listeSolutionElementTab={listSolutionElementTab}
				isLoading={false}/>);

			expect(screen.getByText('Malheureusement, aucune offre ne correspond à votre recherche !')).toBeVisible();
		});

		it('lorsqu‘il n‘y a pas de résulat et que je fournis un message customisé, je vois le message customisé', () => {
			const listSolutionElementTab = [{
				label: 'tab1',
				listeSolutionElement: <></>,
				messageNoResult: <p>ooops 0 résultat</p>,
				messageResultatRecherche: '3 résultats pour tab1',
				nombreDeSolutions: 0,
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				listeSolutionElementTab={listSolutionElementTab}
				isLoading={false}/>);

			expect(screen.getByText('ooops 0 résultat')).toBeVisible();
		});

		describe('lorsque je clique sur un onglet', () => {
			it('et qu‘il a des résultats, je vois le message du résultat de recherche associé à l‘onglet cliqué', async () => {
				const listSolutionElementTab = [{
					label: 'tab1',
					listeSolutionElement: <></>,
					messageResultatRecherche: '3 résultats pour tab1',
					nombreDeSolutions: 1,
				},
				{
					label: 'tab2',
					listeSolutionElement: <></>,
					messageResultatRecherche: '2 résultats pour tab2',
					nombreDeSolutions: 1,
				}];
				
				render(<RechercherSolutionLayoutWithTabs
					bannière={<></>}
					formulaireRecherche={<></>}
					listeSolutionElementTab={listSolutionElementTab}
					isLoading={false}/>);

				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));

				expect(screen.getByText('2 résultats pour tab2')).toBeVisible();
			});

			it('lorsque je clique sur un onglet et qu‘il n‘ a pas de résultat pour cet onglet, je vois le message qui m‘explique qu‘aucun résultat a été trouvé', async () => {
				const listSolutionElementTab = [{
					label: 'tab1',
					listeSolutionElement: <></>,
					messageResultatRecherche: '3 résultats pour tab1',
					nombreDeSolutions: 1,
				},
				{
					label: 'tab2',
					listeSolutionElement: <></>,
					messageResultatRecherche: '2 résultats pour tab2',
					nombreDeSolutions: 0,
				}];
				
				render(<RechercherSolutionLayoutWithTabs
					bannière={<></>}
					formulaireRecherche={<></>}
					listeSolutionElementTab={listSolutionElementTab}
					isLoading={false}/>);

				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));

				expect(screen.getByText('Malheureusement, aucune offre ne correspond à votre recherche !')).toBeVisible();
			});
			
			it('change les query params pour faire correspondre l‘onglet cliqué en conservant les autres query params', async () => {
				const push = jest.fn();
				mockUseRouter({ push, query: { autreQuery: '1', tab: '0' } });
				const listSolutionElementTab = [{
					label: 'tab1',
					listeSolutionElement: <></>,
					messageResultatRecherche: '3 résultats pour tab1',
					nombreDeSolutions: 1,
				},
				{
					label: 'tab2',
					listeSolutionElement: <></>,
					messageResultatRecherche: '2 résultats pour tab2',
					nombreDeSolutions: 0,
				}];

				render(<RechercherSolutionLayoutWithTabs
					bannière={<></>}
					formulaireRecherche={<></>}
					listeSolutionElementTab={listSolutionElementTab}
					isLoading={false}/>);

				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));
				
				expect(push).toHaveBeenCalledWith({ query: { autreQuery: '1', tab: 1 } }, undefined, { shallow: true });
			});
		});
	});
});
