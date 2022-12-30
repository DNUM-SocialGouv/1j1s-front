/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import {
  render,
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import { MeilisearchCustomRangeInputForModal } from '~/client/components/ui/Meilisearch/MeilisearchCustomRangeInputForModal';
import {
  mockUseRangeInput,
} from '~/client/components/ui/Meilisearch/tests/mockMeilisearchUseFunctions';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const spyOnUseRange = jest.spyOn(require('react-instantsearch-hooks-web'), 'useRange');

let refineMock: jest.Mock<string>;

const renderMeilisearchCustomRangeInputForModalComponent = () => {
  render(
    <MeilisearchCustomRangeInputForModal
	  attribute='test'
	  unite='test-unité'
	  min={20}
	  max={200}
    />,
  );
};

describe('MeilisearchCustomRangeForModalInput', ()=> {
  beforeEach(() => {
    refineMock = jest.fn();
    spyOnUseRange.mockImplementation(() => mockUseRangeInput({
	  refine: refineMock,
    }));
  });

  it('monte le composant', ()=> {
    renderMeilisearchCustomRangeInputForModalComponent();
    const meilisearchCustomRangeInputForModalComponent = screen.getByRole('group');
    expect(meilisearchCustomRangeInputForModalComponent).toBeInTheDocument();
  });

  it('contient deux champs inputs de type number', () => {
    renderMeilisearchCustomRangeInputForModalComponent();

    const inputMin = screen.getByLabelText('Minimum');
    const inputMax = screen.getByLabelText('Maximum');

    expect(inputMin).toBeInTheDocument();
    expect(inputMin).toHaveAttribute('type','number');

    expect(inputMax).toBeInTheDocument();
    expect(inputMax).toHaveAttribute('type','number');
  });

  describe('quand on renseigne les champs minimum et maximum', () => {
    it('appelle la fonction refine deux fois avec les valeurs renseignées', async () => {
	  const user = userEvent.setup();
	  renderMeilisearchCustomRangeInputForModalComponent();

	  const inputMin = screen.getByLabelText('Minimum');
	  const inputMax = screen.getByLabelText('Maximum');
	  await user.type(inputMin, '12');
	  inputMax.focus(); // simulate onBlur on inputMin
	  await user.type(inputMax, '50');
	  inputMin.focus(); // simulate onBlur on inputMax

	  expect(refineMock).toHaveBeenCalledTimes(2);
	  expect(refineMock).toHaveBeenCalledWith([12, 50]);
    });
  });

  describe('quand on renseigne seulement le champ minimum', () => {
    it('appelle la fonction refine avec la valeur min et undefined pour le max', async () => {
	  const user = userEvent.setup();
	  renderMeilisearchCustomRangeInputForModalComponent();

	  const inputMin = screen.getByLabelText('Minimum');
	  const inputMax = screen.getByLabelText('Maximum');
	  await user.type(inputMin, '12');
	  inputMax.focus(); // simulate onBlur on inputMin

	  expect(refineMock).toHaveBeenCalledTimes(1);
	  expect(refineMock).toHaveBeenCalledWith([12, undefined]);
    });

  });

  describe('quand on renseigne seulement le champ maximum', () => {
    it('appelle la fonction refine avec la valeur max et undefined pour le min', async () => {
	  const user = userEvent.setup();
	  renderMeilisearchCustomRangeInputForModalComponent();

	  const inputMin = screen.getByLabelText('Minimum');
	  const inputMax = screen.getByLabelText('Maximum');
	  await user.type(inputMax, '50');
	  inputMin.focus(); // simulate onBlur on inputMax

	  expect(refineMock).toHaveBeenCalledTimes(1);
	  expect(refineMock).toHaveBeenCalledWith([undefined, 50]);
    });

  });

});
