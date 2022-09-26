/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import InputAutocomplétionSecteurActivité from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétionSecteurActivité';

describe('InputAutocomplétionSecteurActivité', function () {
  it('doit afficher une proposition de secteur quand on tape une recherche', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const texteRecherché = 'Prod';

    render(<InputAutocomplétionSecteurActivité label={labelText}/>);
    const inputAutocomplétion = screen.getByRole('textbox');

    // When
    await userEvent.type(inputAutocomplétion, texteRecherché);

    // Then
    expect(screen.getByText('Production et distribution d\'eau, assainissement, gestion des déchets et dépollution')).toBeInTheDocument();
    expect(screen.getByText('Production et distribution d\'électricité, de gaz, de vapeur et d\'air conditionné')).toBeInTheDocument();
    expect(screen.queryByText('Santé humaine et action sociale')).not.toBeInTheDocument();
  });
});
