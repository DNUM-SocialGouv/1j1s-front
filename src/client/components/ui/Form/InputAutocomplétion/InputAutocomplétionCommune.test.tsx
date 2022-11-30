/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import InputAutocomplétionCommune from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionCommune';
import { DependenciesProvider } from '~/client/context/dependenciesContainer.context';
import { aLocalisationService } from '~/client/services/localisation/localisationService.fixture';

describe('InputAutocomplétionCommune', function () {
  const localisationService = aLocalisationService();

  it('doit afficher une proposition de commune quand on tape une recherche', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const texteRecherché = 'Par';

    render(<DependenciesProvider localisationService={localisationService}>
      <InputAutocomplétionCommune label={labelText} debounce={1}/>
    </DependenciesProvider>);
    const inputAutocomplétion = screen.getByRole('textbox');

    // When
    await userEvent.type(inputAutocomplétion, texteRecherché);

    // Then
    expect(screen.getByText('Paris 15e Arrondissement')).toBeInTheDocument();
  });
});
