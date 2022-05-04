/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import RechercherOffresEmploi from '~/pages/emplois';

describe('Page rechercher offres emploi', () => {
  it('affiche un formulaire pour la recherche d\'offres d\'emploi', () => {
    render(<RechercherOffresEmploi />);

    const result = screen.getAllByTestId('article');

    expect(result).toHaveLength(2);
  });
});
