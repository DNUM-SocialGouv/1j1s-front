/**
 * @jest-environment jsdom
 */

import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { MeilisearchCustomSearchBox } from '~/client/components/ui/Meilisearch/MeilisearchCustomSearchBox';

// eslint-disable-next-line @typescript-eslint/no-var-requires
jest.spyOn(require('react-instantsearch-hooks-web'), 'useSearchBox');

describe('MeilisearchCustomSearchBox Component', () => {
  it('ne retourne pas de form', () => {
    render(
	  <MeilisearchCustomSearchBox
        label='Rechercher par ville'
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
	  />,
    );
    const form = screen.queryByRole('form');
    expect(form).not.toBeInTheDocument();
  });

  it('contient un input associé à label', () => {
    render(
	  <MeilisearchCustomSearchBox
        label='Rechercher par ville'
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
	  />,
    );
    const input = screen.getByLabelText('Rechercher par ville', { selector: 'input' });
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('name', 'ville');
    expect(input).toHaveAttribute('placeholder', 'Exemples: Paris, Toulouse');
  });

  it('ne contient pas de button reset quand le champ est vide', () => {
    render(
	  <MeilisearchCustomSearchBox
        label='Rechercher par ville'
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
	  />,
    );

    const resetButton = screen.queryByRole('button');
    expect(resetButton).not.toBeInTheDocument();

  });

  it('contient un button reset quand le champ est rempli', async() => {
    render(
	  <MeilisearchCustomSearchBox
        label='Rechercher par ville'
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
	  />,
    );
    const user = userEvent.setup();
    const input = screen.getByLabelText('Rechercher par ville', { selector: 'input' });
    await user.type(input, 'pa');

    const resetButton = screen.queryByRole('button');
    expect(resetButton).toBeInTheDocument();
  });

  it("rend le titre du bouton reset par défaut quand celui ci n'est pas précisé", async () => {
    render(
	  <MeilisearchCustomSearchBox
        label='Rechercher par ville'
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
	  />,
    );
    const user = userEvent.setup();
    const input = screen.getByLabelText('Rechercher par ville', { selector: 'input' });
    await user.type(input, 'pa');

    const resetButton = screen.queryByRole('button');
    expect(resetButton).toHaveAttribute('title', 'Vider le champ de recherche');
  });

  it('rend le titre du bouton reset passé en paramètre quand celui ci est précisé', async () => {
    render(
	  <MeilisearchCustomSearchBox
        label='Rechercher par ville'
        name="ville"
        placeholder="Exemples: Paris, Toulouse"
        resetTitle={'Vider le champ ville'}
	  />,
    );
    const user = userEvent.setup();
    const input = screen.getByLabelText('Rechercher par ville', { selector: 'input' });
    await user.type(input, 'pa');

    const resetButton = screen.queryByRole('button');
    expect(resetButton).toHaveAttribute('title', 'Vider le champ ville');
  });
});
