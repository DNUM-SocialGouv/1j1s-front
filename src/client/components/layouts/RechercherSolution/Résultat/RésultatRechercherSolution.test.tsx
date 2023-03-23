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
		const defaultLogo = '/images/logos/pole-emploi.svg';

		render(
			<RésultatRechercherSolution
				intituléOffre={offreEmploi.intitulé}
				lienOffre={`/emplois/${offreEmploi.id}`}
				logo={offreEmploi.entreprise.logo || defaultLogo}
				sousTitreOffre={offreEmploi.entreprise.nom}
				étiquetteOffreList={offreEmploi.étiquetteList}
			/>,
		);

		const étiquettesOffreAlternanceList = screen.getByRole('list', { name: 'Caractéristiques de l‘offre' });
		const lienVersOffreEmploi = screen.getByRole('link');
		const intituléOffreEmploi = screen.getByRole('heading', { level: 3 });

		expect(within(étiquettesOffreAlternanceList).queryAllByRole('listitem')).toHaveLength(4);
		expect(screen.getByText('En savoir plus')).toBeVisible();
		expect(lienVersOffreEmploi).toHaveAttribute('href', `/emplois/${offreEmploi.id}`);
		expect(intituléOffreEmploi.textContent).toEqual(offreEmploi.intitulé);
	});

	describe('lorsque le lien d‘offre n‘existe pas', () => {
		it('je ne peux pas clicker sur la carte', () => {
			const offreEmploi = aBarmanOffre();
			const defaultLogo = '/images/logos/pole-emploi.svg';

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					logo={offreEmploi.entreprise.logo || defaultLogo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
				/>,
			);

			expect(screen.queryByRole('link')).not.toBeInTheDocument();
			expect(screen.queryByText('En savoir plus')).not.toBeInTheDocument();
		});
	});


	describe('lorsqu‘une description est fournise', () => {
		it('je vois la description', () => {
			const offreEmploi = aBarmanOffre();
			const defaultLogo = '/images/logos/pole-emploi.svg';

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					logo={offreEmploi.entreprise.logo || defaultLogo}
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
			const defaultLogo = '/images/logos/pole-emploi.svg';

			render(
				<RésultatRechercherSolution
					intituléOffre={offreEmploi.intitulé}
					intituléLienOffre="Candidater"
					logo={offreEmploi.entreprise.logo || defaultLogo}
					sousTitreOffre={offreEmploi.entreprise.nom}
					étiquetteOffreList={offreEmploi.étiquetteList}
					lienOffre={`/emplois/${offreEmploi.id}`}
				>
					<div>Description 1</div>
					<div>Description 2</div>
				</RésultatRechercherSolution>,
			);

			expect(screen.getByRole('link', { name: 'Candidater' })).toBeVisible();
		});
	});
});
