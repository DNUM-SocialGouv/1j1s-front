/**
 * @jest-environment jsdom
 */
import { render, screen, within } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockSmallScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';
import { anOffreService } from '~/client/services/offre/offreService.fixture';
import RechercherAlternancePage from '~/pages/apprentissage/index.page';

describe('Page rechercher une alternance', () => {
	const partenaireOnisepTitle = 'Besoin d‘informations sur les métiers ?';
	const partenaireLaBonneAlternanceTitle = 'Étendez votre recherche à LaBonneAlternance';
	const partenairePassTitle = "Recherche une offre d'alternance dans la fonction publique";

	beforeEach(() => {
		mockSmallScreen();
	});
	it('affiche une liste de un partenaire', async () => {
		const offreServiceMock = anOffreService();
		const localisationServiceMock = aLocalisationService();
		mockUseRouter({ query: { page: '1' } });
		render(
			<DependenciesProvider
				localisationService={localisationServiceMock}
				offreService={offreServiceMock}
			>
				<RechercherAlternancePage/>
			</DependenciesProvider>,
		);
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
