/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
} from '@testing-library/react';

import { InstantSearchErrorBoundary } from '~/client/components/layouts/InstantSearch/InstantSearchErrorBoundary';
import {
  mockUseInstantSearch,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';
import { mockLargeScreen } from '~/client/components/window.mock';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyOnInstantSearch = jest.spyOn(require('react-instantsearch-hooks-web'), 'useInstantSearch');


const ChildrenComponent = () => {
  return <div aria-label="composant enfant">je suis le composant enfant</div>;
};
describe('InstantSearchErrorBoundary', () => {
  beforeEach(() => {
    mockLargeScreen();
  });

  describe('Quant instantsearch n‘est pas en erreur', () => {
    it('retourne le composant enfant', () => {
	  spyOnInstantSearch.mockImplementation(() => mockUseInstantSearch({ error: undefined }));
	  render(
	    <InstantSearchErrorBoundary>
		  <ChildrenComponent/>
	    </InstantSearchErrorBoundary>,
	  );
	  const childrenComponentContent = screen.getByLabelText('composant enfant');
	  expect(childrenComponentContent).toBeInTheDocument();
    });
  });

  describe('Quant instantsearch est en erreur', () => {
    it('retourne le composant service indisponible', () => {
	  spyOnInstantSearch.mockImplementation(() => mockUseInstantSearch({ error: { message: 'MeilisearchCommunicationError', name: 'Error' } }));
	  render(
        <InstantSearchErrorBoundary>
		  <ChildrenComponent/>
        </InstantSearchErrorBoundary>,
	  );

	  const errorContent = screen.getByRole('heading', { level: 2 });
	  expect(errorContent).toBeInTheDocument();
	  expect(errorContent).toHaveTextContent('Service Indisponible');
    });
  });
});
