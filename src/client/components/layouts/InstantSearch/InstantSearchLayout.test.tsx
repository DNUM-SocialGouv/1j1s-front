/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { aRechercheClientService } from '~/client/components/layouts/InstantSearch/InstantSearchLayout.fixture';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aRoutingService } from '~/client/services/routing/routing.service.fixture';

jest.mock('react-instantsearch', () => ({
	...jest.requireActual('react-instantsearch'),
	Configure: () => <></>,
}));

describe('<InstantSearchLayout />', () => {
	beforeEach(() => {
		mockLargeScreen();
	});
	it('scroll en haut des résultats quand on change de page', async () => {
		const user = userEvent.setup();
		render(
			<DependenciesProvider
				rechercheClientService={aRechercheClientService()}
				routingService={aRoutingService()}
			>
				<InstantSearchLayout
					meilisearchIndex="fake"
					titre="Titre"
					sousTitre="Sous-titre"
					formulaireDeRecherche={<div></div>}
					tagList={<div></div>}
					nombreDeResultatParPage={1}
					messageResultatRechercheLabelSingulier="résultat trouvé"
					messageResultatRechercheLabelPluriel="résultats trouvés"
					nombreDeSkeleton={1}
					isAffichageListeDeResultatsDesktopDirectionRow={true}
					resultatDeRecherche={() => <div></div>}/>
			</DependenciesProvider>,
		);
		await screen.findByRole('heading', { name: /2 résultats trouvés/ });
		const résultats = screen.getByRole('region', { name: /Résultats de la recherche/i });
		résultats.scrollIntoView = jest.fn();

		const pageSuivant = screen.getByRole('link', { name: /Page suivante/i });
		await user.click(pageSuivant);
		
		expect(résultats.scrollIntoView).toHaveBeenCalledTimes(1);
		expect(résultats.scrollIntoView).toHaveBeenCalledWith(true);
	});
});
