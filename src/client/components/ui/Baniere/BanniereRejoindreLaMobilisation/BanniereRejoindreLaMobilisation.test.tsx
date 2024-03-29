/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import BanniereRejoindreLaMobilisation
	from '~/client/components/ui/Baniere/BanniereRejoindreLaMobilisation/BanniereRejoindreLaMobilisation';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('AidesExceptionnelles', () => {
  
	function renderComponent () {
		render(
			<DependenciesProvider>
				<BanniereRejoindreLaMobilisation />
			</DependenciesProvider>,
		);

	}

	describe('quand on clique sur Rejoindre la mobilisation', () => {
		it('ça te renvoie vers le formulaire des entreprises s‘engagent', () => {
			// Given
			const rejoindreMobilisation = 'Rejoindre la mobilisation';

			renderComponent();

			// Then
			const link = screen.getByRole('link', { name: rejoindreMobilisation });
			expect(link).toBeInTheDocument();
			expect(link).toHaveAttribute('href', expect.stringContaining('/les-entreprises-s-engagent'));
		});
	});
});
