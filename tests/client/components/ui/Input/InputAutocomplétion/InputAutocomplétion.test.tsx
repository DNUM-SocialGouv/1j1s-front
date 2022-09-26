/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import InputAutocomplétion from '~/client/components/ui/Form/InputAutocomplétion/InputAutocomplétion';

async function noOp(): Promise<string[]> {
  return [];
}

function identity<T>(valeur: T) {
  return valeur;
}

describe('InputAutocomplétion', function () {
  it('doit contenir un input', function () {
    // Given
    render(<InputAutocomplétion suggérer={noOp} afficher={() => ''} valeur={() => ''}/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).toBeInTheDocument();
  });

  it('ne doit pas avoir de label par défaut', function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    render(<InputAutocomplétion suggérer={noOp} afficher={() => ''} valeur={() => ''}/>);

    // When
    const labelAutocomplétion = screen.queryByLabelText(labelText);

    // Then
    expect(labelAutocomplétion).not.toBeInTheDocument();
  });

  it('doit contenir le label passé au composant', function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    render(<InputAutocomplétion id="ma-super-autocomplétion" suggérer={noOp} afficher={() => ''} valeur={() => ''} label={labelText}/>);

    // When
    const labelAutocomplétion = screen.getByLabelText(labelText);

    // Then
    expect(labelAutocomplétion).toBeInTheDocument();
  });

  it('doit contenir un input avec le placeholder passé au composant', function () {
    // Given
    const placeholderText = 'Mon super placeholder';
    render(<InputAutocomplétion suggérer={noOp} afficher={() => ''} valeur={() => ''} placeholder={placeholderText}/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).toHaveAttribute('placeholder', placeholderText);
  });

  it('ne doit pas être requried par défaut', function () {
    // Given
    render(<InputAutocomplétion suggérer={noOp} afficher={() => ''} valeur={() => ''}/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).not.toHaveAttribute('required');
  });

  it('doit contenir un input avec required passé au composant', function () {
    // Given
    render(<InputAutocomplétion suggérer={noOp} afficher={() => ''} valeur={() => ''} required/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).toHaveAttribute('required');
  });

  it('doit afficher des suggestions quand on commence à taper des trucs dans la textbox', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const débutDeTruc = 'Pari';

    async function suggérerDesSuggestions(): Promise<string[]> {
      return ['Paris', 'Marseille', 'Toulouse', 'Deauville'];
    }

    render(<InputAutocomplétion suggérer={suggérerDesSuggestions} afficher={identity} valeur={() => ''} label={labelText}
      debounce={1}/>);
    const inputAutocomplétion = screen.getByRole('textbox');

    // When
    await userEvent.type(inputAutocomplétion, débutDeTruc);

    // Then
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Marseille')).toBeInTheDocument();
    expect(screen.getByText('Toulouse')).toBeInTheDocument();
    expect(screen.getByText('Deauville')).toBeInTheDocument();
  });

  it('doit choisir une suggestion quand on sélectionne une option', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const débutDeTruc = 'Deauv';

    async function suggérerDesSuggestions(): Promise<string[]> {
      return ['Paris', 'Marseille', 'Toulouse', 'Deauville'];
    }

    render(<InputAutocomplétion suggérer={suggérerDesSuggestions} afficher={identity} valeur={identity} label={labelText}
      debounce={1}/>);
    const inputAutocomplétion = screen.getByRole('textbox');
    await userEvent.type(inputAutocomplétion, débutDeTruc);

    // When
    await userEvent.click(screen.getByText('Deauville'));

    // Then
    expect(inputAutocomplétion).toHaveValue('Deauville');
  });

  it('doit appeler onChange quand le champ est modifié', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const débutDeTruc = 'D';
    const onChange = jest.fn();

    async function suggérerDesSuggestions(): Promise<string[]> {
      return ['Paris', 'Marseille', 'Toulouse', 'Deauville'];
    }

    render(<InputAutocomplétion suggérer={suggérerDesSuggestions} afficher={identity} valeur={identity} onChange={onChange}
      label={labelText}/>);
    const inputAutocomplétion = screen.getByRole('textbox');

    // When
    await userEvent.type(inputAutocomplétion, débutDeTruc);

    // Then
    expect(onChange).toHaveBeenCalledWith(expect.anything(), 'D');
  });

  it('doit appeler onSuggestionSelected quand on sélectionne une option', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const débutDeTruc = 'Deauv';
    const onSuggestionSelected = jest.fn();

    async function suggérerDesSuggestions(): Promise<string[]> {
      return ['Paris', 'Marseille', 'Toulouse', 'Deauville'];
    }

    render(<InputAutocomplétion suggérer={suggérerDesSuggestions} afficher={identity} valeur={identity} label={labelText}
      debounce={1} onSuggestionSelected={onSuggestionSelected}/>);
    const inputAutocomplétion = screen.getByRole('textbox');
    await userEvent.type(inputAutocomplétion, débutDeTruc);

    // When
    await userEvent.click(screen.getByText('Deauville'));

    // Then
    expect(onSuggestionSelected).toHaveBeenCalledWith(expect.anything(), 'Deauville', 'Deauville', 3, null, 'click');
  });
});
