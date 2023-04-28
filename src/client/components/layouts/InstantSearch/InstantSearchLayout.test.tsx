/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchClient } from 'algoliasearch-helper/types/algoliasearch';

import { InstantSearchLayout } from '~/client/components/layouts/InstantSearch/InstantSearchLayout';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

const mockRechercheService: SearchClient = {
	search() {
		return Promise.resolve({
			results: [{
				exhaustiveFacetsCount: true,
				exhaustiveNbHits: true,
				hits: [],
				hitsPerPage: 1,
				nbHits: 2,
				nbPages: 2,
				page: 1,
				params: '',
				processingTimeMS: 0,
				query: '',
				renderingContent: {
					facetOrdering: {
						facets: {},
						values: {},
					},
				},
				userData: [],
			}],
		});
	},
};
jest.mock('react-instantsearch-hooks-web', () => ({
	...jest.requireActual('react-instantsearch-hooks-web'),
	Configure: () => <></>,
}));

describe('<InstantSearchLayout />', () => {
	beforeEach(() => {
		mockLargeScreen();
	});
	it('scroll en haut des résultats quand on change de page', async () => {
		const user = userEvent.setup();
		render(
			<DependenciesProvider rechercheClientService={mockRechercheService}>
				<InstantSearchLayout
					meilisearchIndex="fake"
					titre="Titre"
					sousTitre="Sous-titre"
					isMeilisearchQueryParamsRoutingEnabled={false}
					formulaireDeRecherche={<div></div>}
					tagList={<div></div>}
					nombreDeResultatParPage={1}
					messageResultatRechercheLabelSingulier="résultat trouvé"
					messageResultatRechercheLabelPluriel="résultats trouvés"
					nombreDeSkeleton={1}
					ariaLabelListeDesResultats="résultats trouvés"
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
