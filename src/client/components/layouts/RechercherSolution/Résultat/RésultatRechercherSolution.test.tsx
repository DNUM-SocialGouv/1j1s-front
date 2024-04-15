/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';

import {
	RésultatRechercherSolution,
} from '~/client/components/layouts/RechercherSolution/Résultat/RésultatRechercherSolution';
import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { aBarmanOffre } from '~/server/offres/domain/offre.fixture';

describe('RésultatRechercherSolution', () => {

	beforeEach(() => {
		mockSmallScreen();
		mockUseRouter({});
	});

	it('affiche une carte emploi avec un résumé de l‘offre', () => {
		const offreEmploi = aBarmanOffre();

		render(
			<RésultatRechercherSolution
				intituléOffre={offreEmploi.intitulé}
				lienOffre={`/emplois/${offreEmploi.id}`}
				logo={offreEmploi.entreprise.logo}
				sousTitreOffre={offreEmploi.entreprise.nom}
				étiquetteOffreList={offreEmploi.étiquetteList}
			/>,
		);
		// TODO (BRUJ 13/04/2024): après la refactorisation du composant avec grid, ne plus utiliser le testId
		const mobileVersion = screen.getByTestId('tagsCTAMobile');
		const étiquettesOffreAlternanceList = within(mobileVersion).getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const lienVersOffreEmploi = within(mobileVersion).getAllByRole('link')[0];
		const intituléOffreEmploi = screen.getByRole('heading', { level: 3 });

		expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(4);
		expect(within(mobileVersion).getByText('En savoir plus')).toBeVisible();
		expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
		expect(intituléOffreEmploi.textContent).toEqual(offreEmploi.intitulé);
	});

	describe('lorsque le lien d‘offre n‘existe pas', () => {
		it('je ne peux pas clicker sur la carte', () => {
			const offreEmploi = aBarmanOffre();

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					logo={offreEmploi.entreprise.logo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
				/>,
			);
			const mobileVersion = screen.getByTestId('tagsCTAMobile');
			expect(within(mobileVersion).queryByRole('link')).not.toBeInTheDocument();
			expect(within(mobileVersion).queryByText('En savoir plus')).not.toBeInTheDocument();
		});
	});


	describe('lorsqu‘une description est fournise', () => {
		it('je vois la description', () => {
			const offreEmploi = aBarmanOffre();

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					logo={offreEmploi.entreprise.logo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
				>
					<div>Description 1</div>
					<div>Description 2</div>
				</RésultatRechercherSolution>,
			);

			expect(screen.getByText('Description 1')).toBeVisible();
			expect(screen.getByText('Description 2')).toBeVisible();
		});
	});

	describe('lorsqu‘un intitulé de lien est fournis', () => {
		it('je vois l‘intitulé', () => {
			const offreEmploi = aBarmanOffre();

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					intituléLienOffre="Candidater"
					logo={offreEmploi.entreprise.logo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
					lienOffre={`/emplois/${offreEmploi.id}`}
				>
					<div>Description 1</div>
					<div>Description 2</div>
				</RésultatRechercherSolution>,
			);

			const mobileVersion = screen.getByTestId('tagsCTAMobile');
			expect(within(mobileVersion).getByRole('link', { name: 'Candidater' })).toBeVisible();
		});
		it('n‘a pas d‘attribut aria-labelledby', () => {
			const offreEmploi = aBarmanOffre();

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					intituléLienOffre="Candidater"
					logo={offreEmploi.entreprise.logo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
					lienOffre={`/emplois/${offreEmploi.id}`}
				>
					<div>Description 1</div>
					<div>Description 2</div>
				</RésultatRechercherSolution>,
			);
			const mobileVersion = screen.getByTestId('tagsCTAMobile');
			const lien = within(mobileVersion).getByRole('link', { name: 'Candidater' });
			expect(lien).toBeVisible();
			expect(lien).not.toHaveAttribute('aria-labelledby');
		});
	});
	describe('lorsqu‘un intitulé de lien n‘est pas fournis', () => {
		it('le nom du lien par défaut est complété par l‘intitulé de l‘offre', () => {
			const offreEmploi = aBarmanOffre();

			render(
				<RésultatRechercherSolution
					intituléOffre={'Barman'}
					logo={offreEmploi.entreprise.logo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
					lienOffre={`/emplois/${offreEmploi.id}`}
				>
					<div>Description 1</div>
					<div>Description 2</div>
				</RésultatRechercherSolution>,
			);
			const mobileVersion = screen.getByTestId('tagsCTAMobile');
			expect(within(mobileVersion).getByRole('link', { name: 'Barman En savoir plus' })).toBeVisible();
		});
	});
});
