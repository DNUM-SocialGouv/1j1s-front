/**
 * @jest-environment jsdom
 */

import { render } from '@testing-library/react';

import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import Accessibilite from '~/pages/accessibilite/index.page';
import { checkA11y } from '~/test-utils';

describe('<Accessibilite />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		const titre = 'titre';
		const contenu = 'contenu';
		const { container } = render(
			<DependenciesProvider analyticsService={anAnalyticsService()}>
				<Accessibilite titre={titre} contenu={contenu}/>);
			</DependenciesProvider>);

		await checkA11y(container);
	});
});
