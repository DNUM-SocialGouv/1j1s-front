/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Select } from '~/client/components/ui/Select/Select';
import { mapTypeDeContratToOffreEmploiCheckboxFiltre } from '~/client/utils/offreEmploi.mapper';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('Select', () => {

  describe('Select Single', () => {
    it('quand on clique sur le select, retourne une liste d\'options', async () => {
      //GIVEN
      const user = userEvent.setup();
      render(
        <Select
          placeholder={'Temps de travail'}
          name="tempsDeTravail"
          optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
          label={'Temps de travail'}
          value=""
        />,
      );

      //WHEN
      const button = screen.getByRole('button', { name: 'Temps de travail' });
      user.click(button);
      await screen.findByRole('listbox');

      //THEN
      expect(screen.getByRole('option', { name: 'Temps plein' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Temps partiel' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Indifférent' })).toBeInTheDocument();
    });

    it('quand on sélectionne une valeur, met la valeur selectionné dans l\'input', async () => {
      //GIVEN
      render(
        <Select
          name="tempsDeTravail"
          optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
          label={'Temps de travail'}
        />,
      );

      //WHEN
      const button = screen.getByRole('button', { name: 'Temps de travail' });
      fireEvent.click(button);
      const listbox = screen.getByRole('listbox');
      const input = within(listbox).getByRole('option', { name: 'Temps plein' });
      fireEvent.click(input);

      //THEN
      await waitFor(async () => {
        const placeholder = await screen.findByTestId( 'Select-Placeholder' );
        expect(placeholder.textContent).toEqual('Temps plein');
      });

      const hiddenInput = await screen.findByTestId('Select-InputHidden');
      expect(hiddenInput).toHaveValue('tempsPlein');
    });
  });

  describe('Select Multiple', () => {
    it('quand on clique sur le select, retourne une liste d\'options', async () => {
      //GIVEN
      const user = userEvent.setup();
      render(
        <Select
          multiple
          placeholder={'Type de contrat'}
          optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(OffreEmploi.TYPE_DE_CONTRAT_LIST)}
          label={'Type de contrat'}
        />,
      );

      //WHEN
      const button = screen.getByRole('button', { name: 'Type de contrat' });
      user.click(button);
      await screen.findByRole('listbox');

      //THEN
      expect(screen.getByRole('option', { name: 'CDD' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'CDI' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Intérim' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name: 'Saisonnier' })).toBeInTheDocument();
    });

    it('quand on sélectionne une valeur, met la valeur sélectionnée dans l\'input', async () => {
      //GIVEN
      render(
        <Select
          multiple
          placeholder={'Type de contrat'}
          optionList={mapTypeDeContratToOffreEmploiCheckboxFiltre(OffreEmploi.TYPE_DE_CONTRAT_LIST)}
          label={'Type de contrat'}
        />,
      );

      //WHEN
      const button = screen.getByRole('button', { name: 'Type de contrat' });
      fireEvent.click(button);
      const listbox = await screen.findByRole('listbox');
      const input = within(listbox).getAllByRole('option');
      fireEvent.click(input[1]);

      //THEN
      await waitFor(async () => {
        const placeholder = await screen.findByTestId( 'Select-Placeholder' );
        expect(placeholder.textContent).toEqual('Type de contrat... (1)');
      });

      const hiddenInput = await screen.findByTestId('Select-InputHidden');
      expect(hiddenInput).toHaveValue('CDI');
    });
  });
});
