/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import {
	RechercherSolutionLayoutWithTabs,
} from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayoutWithTabs';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSessionStorage } from '~/client/components/window.mock';

describe('RechercherSolutionLayoutWithTabs', () => {
	beforeEach(() => {
		mockUseRouter({ query:  { motCle: 'boulanger', page: '1' } });
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
				isLoading={false}
				currentTabKey="currentTab-key"
			/>);

			expect(screen.getByText('3 résultats pour tab1')).toBeVisible();
		});

		it('lorsqu‘il n‘y a pas de résultat, je vois le message par défaut qui m‘explique qu‘aucun résultat a été trouvé', () => {
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
				isLoading={false}
				currentTabKey="currentTab-key"
			/>);

			expect(screen.getByText('Malheureusement, aucune offre ne correspond à votre recherche !')).toBeVisible();
		});

		it('lorsqu‘il n‘y a pas de résultat et que je fournis un message customisé, je vois le message customisé', () => {
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
				isLoading={false}
				currentTabKey="currentTab-key"
			/>);

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
					isLoading={false}
					currentTabKey="currentTab-key"
				/>);

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
					isLoading={false}
					currentTabKey="currentTab-key"
				/>);

				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));

				expect(screen.getByText('Malheureusement, aucune offre ne correspond à votre recherche !')).toBeVisible();
			});
		});

		describe('stockage de la clé de l‘onglet courant', () => {
			const getItem = jest.fn().mockReturnValue(1);
			const setItem = jest.fn();
			beforeAll(() => {
				mockSessionStorage({
					getItem,
					setItem,
				});
			});

			it('lorsqu’il y a une clé de tab par défaut dans le stockage, récupère cette clé et affiche le contenu de l’onglet correspondant', () => {
				// GIVEN
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

				// WHEN
				render(<RechercherSolutionLayoutWithTabs
					bannière={<></>}
					formulaireRecherche={<></>}
					listeSolutionElementTab={listSolutionElementTab}
					isLoading={false}
					currentTabKey="currentTab-key"
				/>);

				// THEN
				expect(getItem).toHaveBeenCalledWith('currentTab-key');
				expect(screen.getByText('2 résultats pour tab2')).toBeVisible();
			});

			it('lorsque je clique sur un onglet, stocke la clé de l‘onglet cliqué dans le stockage', async () => {
				// GIVEN
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
					isLoading={false}
					currentTabKey="currentTab-key"
				/>);

				// WHEN
				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));

				// THEN
				expect(setItem).toHaveBeenCalledWith('currentTab-key', '1');
			});
		});
	});
});
