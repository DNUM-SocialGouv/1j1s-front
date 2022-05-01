/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import { anArticleList } from '@tests/fixtures/client/cms.fixture';

import Accueil from '~/pages';

describe('Page accueil', () => {
  it('affiche une liste d\'article', () => {
    render(<Accueil articles={anArticleList()} />);

    const result = screen.getAllByTestId('article');

    expect(result).toHaveLength(2);
  });
});
