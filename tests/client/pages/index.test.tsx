/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';

import Accueil from '~/pages';

describe('Page accueil', () => {
  it('affiche une liste d\'article', () => {
    render(<Accueil />);

    const main = screen.getByRole('main');

    expect(main).toBeInTheDocument();
  });
});
