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
		mockUseRouter({ query:  { motCle: 'boulanger', page: '1' } });
	});

	describe('je vois le nombre de résultat', () => {
		it('lorsqu‘il y a des résultats, je vois le message du résultat de recherche associé au premier onglet', () => {
			const listSolutionElementTab = [{
				label: 'tab1',
				listeSolutionElement: <ul>
					<li>tab1-el1</li>
				</ul>,
				messageResultatRecherche: '3 résultats pour tab1',
			},
			{
				label: 'tab2',
				listeSolutionElement: <ul>
					<li>tab2-el1</li>
				</ul>,
				messageResultatRecherche: '2 résultats pour tab2',
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				nombreSolutions={[1, 1]}
				listeSolutionElementTab={listSolutionElementTab}
				isLoading={false}/>);

			expect(screen.getByText('3 résultats pour tab1')).toBeVisible();
		});

		it('lorsqu‘il n‘y a pas de résulat, je vois le message par default qui m‘explique qu‘aucun résultat a été trouvé', () => {
			const listSolutionElementTab = [{
				label: 'tab1',
				listeSolutionElement: <></>,
				messageResultatRecherche: '3 résultats pour tab1',
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				nombreSolutions={[0]}
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
			}];
			render(<RechercherSolutionLayoutWithTabs
				bannière={<></>}
				formulaireRecherche={<></>}
				nombreSolutions={[0]}
				listeSolutionElementTab={listSolutionElementTab}
				isLoading={false}/>);

			expect(screen.getByText('ooops 0 résultat')).toBeVisible();
		});

		describe('lorsque je clique sur un onglet', () => {
			it('et qu‘il a des résultats, je vois le message du résultat de recherche associé à l‘onglet cliqué', async () => {
				const listSolutionElementTab = [{
					label: 'tab1',
					listeSolutionElement: <ul>
						<li>tab1-el1</li>
					</ul>,
					messageResultatRecherche: '3 résultats pour tab1',
				},
				{
					label: 'tab2',
					listeSolutionElement: <ul>
						<li>tab2-el1</li>
					</ul>,
					messageResultatRecherche: '2 résultats pour tab2',
				}];
				
				render(<RechercherSolutionLayoutWithTabs
					bannière={<></>}
					formulaireRecherche={<></>}
					nombreSolutions={[1, 1]}
					listeSolutionElementTab={listSolutionElementTab}
					isLoading={false}/>);

				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));

				expect(screen.getByText('2 résultats pour tab2')).toBeVisible();
			});

			it('lorsque je clique sur un onglet et qu‘il n‘ a pas de résultat pour cet onglet, je vois le message qui m‘explique qu‘aucun résultat a été trouvé', async () => {
				const listSolutionElementTab = [{
					label: 'tab1',
					listeSolutionElement: <ul>
						<li>tab1-el1</li>
					</ul>,
					messageResultatRecherche: '3 résultats pour tab1',
				},
				{
					label: 'tab2',
					listeSolutionElement: <ul>
						<li>tab2-el1</li>
					</ul>,
					messageResultatRecherche: '2 résultats pour tab2',
				}];
				
				render(<RechercherSolutionLayoutWithTabs
					bannière={<></>}
					formulaireRecherche={<></>}
					nombreSolutions={[1, 0]}
					listeSolutionElementTab={listSolutionElementTab}
					isLoading={false}/>);

				const user = userEvent.setup();
				await user.click(screen.getByRole('tab', { name: 'tab2' }));

				expect(screen.getByText('Malheureusement, aucune offre ne correspond à votre recherche !')).toBeVisible();
			});
		});
	});
});
