/**
 * @jest-environment jsdom
 */
import {
  render,
  screen,
  within,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { FormulaireRechercheAnnonceLogement } from '~/client/components/features/Logement/FormulaireRecherche/FormulaireRechercheAnnonceLogement';
import { mockLargeScreen,mockSmallScreen } from '~/client/components/window.mock';

describe('FormulaireRechercheAnnonceLogement', () => {
  describe('en Desktop', () => {
    beforeEach(() => {
	  mockLargeScreen();
    });

    afterEach(() => {
	  jest.resetAllMocks();
    });

    it('affiche un formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const form = screen.getByRole('search');
	  expect(form).toBeInTheDocument();
    });

    it('n‘affiche pas de bouton pour filtrer la recherche', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const buttonFiltre = screen.queryByRole('button', { name: 'Filtrer ma recherche' });
	  expect(buttonFiltre).not.toBeInTheDocument();
    });

    it('affiche le champ ville dans le formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const inputVille = screen.getByRole('textbox', { name: 'Rechercher par ville' });
	  expect(inputVille).toBeInTheDocument();
    });

    it('affiche le champ type d‘offre dans le formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const buttonTypeOffre = screen.getByRole('button', { name: "Type d'offre" });
	  expect(buttonTypeOffre).toBeInTheDocument();
    });

    it('affiche le champ type de bien dans le formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const buttonTypeOffre = screen.getByRole('button', { name: 'Type de bien' });
	  expect(buttonTypeOffre).toBeInTheDocument();
    });
  });

  describe('en Mobile', () => {
    beforeEach(() => {
	  mockSmallScreen();
    });

    afterEach(() => {
	  jest.resetAllMocks();
    });

    it('affiche un formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const form = screen.getByRole('search');
	  expect(form).toBeInTheDocument();
    });

    it('affiche le champ ville dans le formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const inputVille = screen.getByRole('textbox', { name: 'Rechercher par ville' });
	  expect(inputVille).toBeInTheDocument();
	  expect(inputVille).toBeVisible();
    });

    it('affiche un bouton pour filtrer la recherche', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
	  expect(buttonFiltre).toBeInTheDocument();
    });

    it('n‘affiche pas le champ type d‘offre dans le formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const buttonTypeOffre = screen.queryByRole('button', { name: "Type d'offre" });
	  expect(buttonTypeOffre).not.toBeInTheDocument();

    });

    it('n‘affiche pas le champ type de bien dans le formulaire', () => {
	  render(<FormulaireRechercheAnnonceLogement/>);

	  const buttonTypeBien = screen.queryByRole('button', { name: 'Type de bien' });
	  expect(buttonTypeBien).not.toBeInTheDocument();

    });

    describe('quand l‘utilisateur ouvre les filtres de recherche', () => {
	  it('affiche la modale', async () => {
        const user = userEvent.setup();

        render(<FormulaireRechercheAnnonceLogement/>);

        const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
        await user.click(buttonFiltre);

        const modalComponent = screen.getByRole('dialog');
        expect(modalComponent).toHaveClass('show');
	  });

	  it('affiche le champ type d‘offre', async () => {
        const user = userEvent.setup();

        render(<FormulaireRechercheAnnonceLogement/>);

        const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
        await user.click(buttonFiltre);

        const modalComponent = screen.getByRole('dialog');
        const accordeonItems = within(modalComponent).getAllByRole('group');
        const firstItem = accordeonItems[0];

        expect(firstItem).toHaveTextContent("Type d'offre");
	  });

	  it('affiche le champ type de bien', async () => {
        const user = userEvent.setup();

        render(<FormulaireRechercheAnnonceLogement/>);

        const buttonFiltre = screen.getByRole('button', { name: 'Filtrer ma recherche' });
        await user.click(buttonFiltre);

        const modalComponent = screen.getByRole('dialog');
        const accordeonItems = within(modalComponent).getAllByRole('group');
        const secondItem = accordeonItems[1];

        expect(secondItem).toHaveTextContent('Type de bien');
	  });
    });
  });
});
