/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import { RechercherSolutionLayout } from '~/client/components/layouts/RechercherSolution/RechercherSolutionLayout';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { ErreurMetier } from '~/server/errors/erreurMetier.types';

describe('RechercherSolutionLayout', () => {
	beforeEach(() => {
		mockUseRouter({ query: { motCle: 'boulanger', page: '1' } });
	});

	describe('aucune recherche n’est lancée', () => {
		it('n’affiche pas le message de résultats de recherche ni d’étiquette', () => {
			// GIVEN
			const messageResultat = 'message de résultats de recherche';
			const etiquettes = 'étiquettes de recherche';
			const propsQuiVeutDireQueAucuneRechercheEstLancee = {
				isEtatInitial: true,
			};

			// WHEN
			render(<RechercherSolutionLayout
				banniere={<></>}
				formulaireRecherche={<></>}
				etiquettesRecherche={<>{etiquettes}</>}
				messageResultatRecherche={<h2>{messageResultat}</h2>}
				listeSolutionElement={<></>}
				isChargement={false}
				nombreTotalSolutions={0}
				{...propsQuiVeutDireQueAucuneRechercheEstLancee}
			/>);

			// THEN
			expect(screen.queryByRole('heading', { level: 2, name: messageResultat })).not.toBeInTheDocument();
			expect(screen.queryByText(etiquettes)).not.toBeInTheDocument();
		});
	});

	describe('pendant le chargement de la recherche', () => {
		it('affiche les skeletons', () => {
			// GIVEN
			const propsQuiVeutDireQueLaRechercheEstEnCours = {
				isChargement: true,
			};

			// WHEN
			render(<RechercherSolutionLayout
				banniere={<></>}
				formulaireRecherche={<></>}
				etiquettesRecherche={<></>}
				messageResultatRecherche={<></>}
				listeSolutionElement={<></>}
				isEtatInitial={false}
				nombreTotalSolutions={0}
				{...propsQuiVeutDireQueLaRechercheEstEnCours}
			/>);

			// THEN
			const skeletons = screen.getAllByLabelText('...En cours de chargement');
			expect(skeletons).toHaveLength(2);
			const skeletonMessageResultatUl = skeletons[0];
			const skeletonMessageResultatLi = within(skeletons[0]).getAllByRole('listitem');
			expect(skeletonMessageResultatUl).toBeVisible();
			expect(skeletonMessageResultatLi).toHaveLength(1);
			const skeletonListeResultatsUl = skeletons[1];
			const skeletonListeResultatsLi = within(skeletons[1]).getAllByRole('listitem');
			expect(skeletonListeResultatsUl).toBeVisible();
			expect(skeletonListeResultatsLi).toHaveLength(2);
		});
	});

	describe('la recherche est effectuée', () => {
		describe('lorsqu‘il en résulte une erreur', () => {
			it('l‘erreur est annoncée directement au lecteur d‘écran', () => {
				const propsQuiVeutDireQuIlYADesResultatsEtPasDErreur = {
					isChargement: false,
					nombreTotalSolutions: 0,
				};

				// WHEN
				render(<RechercherSolutionLayout
					{...propsQuiVeutDireQuIlYADesResultatsEtPasDErreur}
					banniere={<></>}
					formulaireRecherche={<></>}
					etiquettesRecherche={<>étiquettes</>}
					listeSolutionElement={<>liste des résultats</>}
					messageResultatRecherche={<>message du nombre de résultats</>}
					isEtatInitial={false}
				/>);

				const alertElement = screen.getByRole('alert');

				expect(alertElement).toHaveTextContent(/0 résultat/);
				expect(alertElement).toHaveTextContent(/Malheureusement, aucune offre ne correspond à votre recherche !Vérifiez l‘orthographe, essayez d‘autres mots-clés ou élargissez votre zone géographique de recherche./);
			});

			it('affiche l’erreur en question', () => {
				// GIVEN
				const erreurDonneeEnProps = ErreurMetier.DEMANDE_INCORRECTE;
				const propsQuiVeutDireQuIlYAErreur = {
					erreurRecherche: erreurDonneeEnProps,
					isChargement: false,
				};

				// WHEN
				render(<RechercherSolutionLayout
					{...propsQuiVeutDireQuIlYAErreur}
					banniere={<></>}
					etiquettesRecherche={<></>}
					formulaireRecherche={<></>}
					messageResultatRecherche={<></>}
					listeSolutionElement={<></>}
					isEtatInitial={false}
					nombreTotalSolutions={0}
				/>);

				// THEN
				const messageErreur = screen.getByText('Erreur - Demande incorrecte');
				expect(messageErreur).toBeVisible();
			});

			it('n’affiche pas les étiquettes de la recherche, le message du nombre de résultats, la liste des résultats', () => {
				// GIVEN
				const erreurDonneeEnProps = ErreurMetier.DEMANDE_INCORRECTE;
				const propsQuiVeutDireQuIlYAErreur = {
					erreurRecherche: erreurDonneeEnProps,
					isChargement: false,
				};

				// WHEN
				render(<RechercherSolutionLayout
					{...propsQuiVeutDireQuIlYAErreur}
					banniere={<></>}
					etiquettesRecherche={<div data-testid={'étiquettes'}/>}
					formulaireRecherche={<></>}
					messageResultatRecherche={<div data-testid={'message du nombre de résultats'}/>}
					isEtatInitial={false}
					nombreTotalSolutions={0}
					listeSolutionElement={<div data-testid={'liste des résultats'}/>}
				/>);

				// THEN
				const etiquettes = screen.queryByTestId('étiquettes');
				const messageNbResultats = screen.queryByTestId('message du nombre de résultats');
				const listeResultats = screen.queryByTestId('liste des résultats');
				expect(etiquettes).not.toBeInTheDocument();
				expect(messageNbResultats).not.toBeInTheDocument();
				expect(listeResultats).not.toBeInTheDocument();
			});
		});

		describe('lorsqu‘il n’y a pas d’erreur', () => {
			describe('lorsqu’il y a des résultats', () => {
				it('le nombre de résultat est annoncée au lecteur d‘écran', () => {
					const propsQuiVeutDireQuIlYADesResultatsEtPasDErreur = {
						isChargement: false,
						nombreTotalSolutions: 10,
					};

					// WHEN
					render(<RechercherSolutionLayout
						{...propsQuiVeutDireQuIlYADesResultatsEtPasDErreur}
						banniere={<></>}
						formulaireRecherche={<></>}
						etiquettesRecherche={<>étiquettes</>}
						listeSolutionElement={<>liste des résultats</>}
						messageResultatRecherche={<>message du nombre de résultats</>}
						isEtatInitial={false}
					/>);

					expect(screen.getByRole('status')).toHaveTextContent('message du nombre de résultats');
				});

				it('affiche les étiquettes de la recherche, le message du nombre de résultats, la liste des résultats', () => {
					const propsQuiVeutDireQuIlYADesResultatsEtPasDErreur = {
						isChargement: false,
						nombreTotalSolutions: 10,
					};

					// WHEN
					render(<RechercherSolutionLayout
						{...propsQuiVeutDireQuIlYADesResultatsEtPasDErreur}
						banniere={<></>}
						formulaireRecherche={<></>}
						etiquettesRecherche={<>étiquettes</>}
						listeSolutionElement={<>liste des résultats</>}
						messageResultatRecherche={<>message du nombre de résultats</>}
						isEtatInitial={false}
					/>);

					// THEN
					const etiquettes = screen.getByText('étiquettes');
					const messageNbResultats = screen.getByText('message du nombre de résultats');
					const listeResultats = screen.getByText('liste des résultats');

					expect(etiquettes).toBeVisible();
					expect(messageNbResultats).toBeVisible();
					expect(listeResultats).toBeVisible();
				});

				it('affiche une footnote et une pagination', () => {
					// GIVEN
					mockSmallScreen();
					const propsQuiVeutDireQuIlYADesResultatsEtPasDErreur = {
						isChargement: false,
						nombreTotalSolutions: 10,
					};

					// WHEN
					render(<RechercherSolutionLayout
						{...propsQuiVeutDireQuIlYADesResultatsEtPasDErreur}
						banniere={<></>}
						formulaireRecherche={<></>}
						etiquettesRecherche={<></>}
						listeSolutionElement={<div data-testid={'liste des résultats'}/>}
						messageResultatRecherche={<></>}
						isEtatInitial={false}
						footnote={<div data-testid={'footnote'}/>}
						paginationOffset={5}
					/>);

					// THEN
					const footnote = screen.getByTestId('footnote');
					expect(footnote).toBeVisible();
					const pagination = screen.getByRole('navigation', { name: 'pagination' });
					expect(pagination).toBeVisible();
				});
			});

			describe('il y a 0 résultat', () => {
				it('affiche une message indiquant 0 résultat', () => {
					// GIVEN
					const propsQuiVeutDireQuIlYA0Resultat = {
						isChargement: false,
						nombreTotalSolutions: 0,
					};

					// WHEN
					render(<RechercherSolutionLayout
						{...propsQuiVeutDireQuIlYA0Resultat}
						banniere={<></>}
						formulaireRecherche={<></>}
						etiquettesRecherche={<div data-testid={'étiquettes'}/>}
						messageResultatRecherche={<div data-testid={'message du nombre de résultats'}/>}
						listeSolutionElement={<div data-testid={'liste des résultats'}/>}
						isEtatInitial={false}
					/>);

					// THEN
					const messageNbResultats = screen.getByText('0 résultat');

					expect(messageNbResultats).toBeVisible();
					expect(screen.queryByTestId('message du nombre de résultats')).not.toBeInTheDocument();
					expect(screen.queryByTestId('étiquettes')).not.toBeInTheDocument();
				});
				it('n’affiche pas d’étiquettes de la recherche, ni de message du nombre de résultats, ni la liste des résultats', () => {
					// GIVEN
					const propsQuiVeutDireQuIlYA0Resultat = {
						isChargement: false,
						nombreTotalSolutions: 0,
					};

					// WHEN
					render(<RechercherSolutionLayout
						{...propsQuiVeutDireQuIlYA0Resultat}
						banniere={<></>}
						formulaireRecherche={<></>}
						etiquettesRecherche={<div data-testid={'étiquettes'}/>}
						messageResultatRecherche={<div data-testid={'message du nombre de résultats'}/>}
						listeSolutionElement={<div data-testid={'liste des résultats'}/>}
						isEtatInitial={false}
					/>);

					// THEN
					const etiquettes = screen.queryByTestId('étiquettes');
					const messageNbResultats = screen.queryByTestId('message du nombre de résultats');
					const listeResultats = screen.queryByTestId('liste des résultats');
					expect(etiquettes).not.toBeInTheDocument();
					expect(messageNbResultats).not.toBeInTheDocument();
					expect(listeResultats).not.toBeInTheDocument();
				});
			});
		});
	});
});
