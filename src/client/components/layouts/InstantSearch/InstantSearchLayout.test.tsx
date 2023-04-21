/**
 * @jest-environment jsdom
 */

import { render, screen, within } from '@testing-library/react';
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
				hitsPerPage: 20,
				nbHits: 1,
				nbPages: 1,
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
	it('affiche la note de bas de page sur les partenaires', async () => {
		mockLargeScreen();

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
		await screen.findByRole('heading', { name: '1 résultat trouvé' });

		const mention = screen.getByText(/les annonces listées ci-dessus nous sont fournies par nos partenaires/);
		expect(mention).toBeVisible();
		const lienCGU = within(mention).getByRole('link', { name: 'liste disponible dans les CGU' });
		expect(lienCGU).toHaveAttribute('href', '/cgu#3-services');
	});
});
