/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { Select } from '~/client/components/ui/Select/Select';
import {
  mapTypeDeContratToOffreEmploiCheckboxFiltre,
} from '~/client/utils/offreEmploi.mapper';
import { OffreEmploi } from '~/server/offresEmploi/domain/offreEmploi';

describe('Select', () => {

  describe('Select Single', () => {

    it('quand on sélectionne une valeur, retourne une liste d\'options', async () => {

      //GIVEN
      const user = userEvent.setup();
      render(
        <Select
          placeholder={'Temps de travail'}
          name="tempsDeTravail"
          optionList={OffreEmploi.TEMPS_DE_TRAVAIL_LIST}
          label={'Temps de travail'}
        />,
      );

      //WHEN
      const button = screen.getByRole('button', { name: 'Temps de travail' });
      user.click(button);
      await screen.findByRole('listbox');

      //THEN
      expect(screen.getByRole('option', { name : 'Temps plein' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name : 'Temps partiel' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name : 'Indifférent' })).toBeInTheDocument();
    });
  });

  describe('Select Multiple', () => {
    it('quand on sélectionne une valeur, retourne une liste d\'options', async () => {

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
      expect(screen.getByRole('option', { name : 'CDD' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name : 'CDI' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name : 'Intérim' })).toBeInTheDocument();
      expect(screen.getByRole('option', { name : 'Saisonnier' })).toBeInTheDocument();
    });
  });
});
