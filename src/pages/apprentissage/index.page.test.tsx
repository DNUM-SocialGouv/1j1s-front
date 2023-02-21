/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAlternanceService } from '~/client/services/alternance/alternance.service.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { aMétierService } from '~/client/services/métiers/métier.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import RechercherAlternancePage from '~/pages/apprentissage/index.page';

describe('Page rechercher une alternance', () => {
	const partenaireOnisepTitle = 'Besoin d‘informations sur les métiers ?';
	const partenaireLaBonneAlternanceTitle = 'Étendez votre recherche à LaBonneAlternance';
	const partenairePassTitle = "Recherche une offre d'alternance dans la fonction publique";

	beforeEach(() => {
		mockSmallScreen();
	});

	describe('quand le feature flip n‘est pas actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '0',
			};
		});

		it('affiche le titre contenant Pôle Emploi et une liste de un partenaire', async () => {
			const offreServiceMock = anOffreService();
			const localisationServiceMock = aLocalisationService();
			const métierServiceMock = aMétierService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					offreService={offreServiceMock}
					métierService={métierServiceMock}
				>
					<RechercherAlternancePage/>
				</DependenciesProvider>,
			);

			const titre = screen.getByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent('sélectionnés pour vous par Pôle Emploi');

			const listePartenaires = await screen.findByRole('list', {
				name: 'Liste des partenaires',
			});
			expect(listePartenaires).toBeInTheDocument();
			const partenaires = within(listePartenaires).getAllByRole('listitem');
			expect(partenaires.length).toBe(3);
			expect(within(partenaires[0]).getByText(partenaireLaBonneAlternanceTitle)).toBeInTheDocument();
			expect(within(partenaires[1]).getByText(partenairePassTitle)).toBeInTheDocument();
			expect(within(partenaires[2]).getByText(partenaireOnisepTitle)).toBeInTheDocument();
		});
	});

	describe('quand le feature flip est actif', () => {
		beforeEach(() => {
			process.env = {
				...process.env,
				NEXT_PUBLIC_ALTERNANCE_LBA_FEATURE: '1',
			};
		});

		it('affiche le titre propre à la Bonne Alternance', async () => {
			const alternanceServiceMock = anAlternanceService();
			const localisationServiceMock = aLocalisationService();
			const métiersServiceMock = aMétierService();
			mockUseRouter({ query: { page: '1' } });
			render(
				<DependenciesProvider
					localisationService={localisationServiceMock}
					alternanceService={alternanceServiceMock}
					métierService={métiersServiceMock}
				>
					<RechercherAlternancePage/>
				</DependenciesProvider>,
			);

			const titre = await screen.findByRole('heading', { level: 1 });
			expect(titre).toHaveTextContent('Avec La Bonne Alternance');

		});
	});

});
