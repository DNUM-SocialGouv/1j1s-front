/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AidesExceptionnelles
  from '~/client/components/features/JeDeviensMentor/AidesExceptionnelles/AidesExceptionnelles';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';

describe('AidesExceptionnelles', () => {
  
  function renderComponent () {
    render(
      <DependenciesProvider>
        <AidesExceptionnelles />
      </DependenciesProvider>,
    );

  }

  describe('quand on clique sur Rejoindre la mobilisation', () => {
    it('ça te renvoie vers le formulaire des entreprises s\'engagent', async () => {
      // Given
      const rejoindreMobilisation = 'Rejoindre la mobilisation';
      renderComponent();

      // When
      const pageEntreprisesSEngagent = await userEvent.click(screen.getByRole('link', { name: rejoindreMobilisation }));

      // Then
      expect(pageEntreprisesSEngagent).toBeInTheDocument();
      expect(pageEntreprisesSEngagent).toHaveAttribute('href', expect.stringContaining('/les-entreprises-s-engagent/inscription'));
    });
  });
});
