/**
 * @jest-environment jsdom
 */

import '~/test-utils';

import { render } from '@testing-library/react';

import { mockUseRouter } from '~/client/components/useRouter.mock';
import { mockLargeScreen } from '~/client/components/window.mock';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { anAnalyticsService } from '~/client/services/analytics/analytics.service.fixture';
import {
	anÉtablissementAccompagnementService,
} from '~/client/services/établissementAccompagnement/établissementAccompagnement.fixture';
import { aLocalisationService } from '~/client/services/localisation/localisation.service.fixture';
import Accompagnement from '~/pages/accompagnement/index.page';

describe('<Accompagnement />', () => {
	it('n‘a pas de défaut d‘accessibilité', async () => {
		mockUseRouter({});
		mockLargeScreen();

		const { container } = render(
			<DependenciesProvider
				analyticsService={anAnalyticsService()}
				établissementAccompagnementService={anÉtablissementAccompagnementService()}
				localisationService={aLocalisationService()}
			>
				<Accompagnement />
			</DependenciesProvider>,
		);
		
		await expect(container).toBeAccessible();
	});
});
