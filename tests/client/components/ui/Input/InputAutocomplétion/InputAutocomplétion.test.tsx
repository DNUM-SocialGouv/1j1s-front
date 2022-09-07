/**
 * @jest-environment jsdom
 */
import '@testing-library/jest-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';

import InputAutocomplétion from '~/client/components/ui/Input/InputAutocomplétion/InputAutocomplétion';

function identity<T>(valeur: T) {
  return valeur;
}

describe('InputAutocomplétion', function () {
  it('doit contenir un input', function () {
    // Given
    render(<InputAutocomplétion suggérer={() => []} afficher={() => ''} valeur={() => ''}/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).toBeInTheDocument();
  });

  it('ne doit pas avoir de label par défaut', function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    render(<InputAutocomplétion suggérer={() => []} afficher={() => ''} valeur={() => ''}/>);

    // When
    const labelAutocomplétion = screen.queryByLabelText(labelText);

    // Then
    expect(labelAutocomplétion).not.toBeInTheDocument();
  });

  it('doit contenir le label passé au composant', function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    render(<InputAutocomplétion suggérer={() => []} afficher={() => ''} valeur={() => ''} label={labelText}/>);

    // When
    const labelAutocomplétion = screen.getByLabelText(labelText);

    // Then
    expect(labelAutocomplétion).toBeInTheDocument();
  });

  it('doit contenir un input avec le placeholder passé au composant', function () {
    // Given
    const placeholderText = 'Mon super placeholder';
    render(<InputAutocomplétion suggérer={() => []} afficher={() => ''} valeur={() => ''} placeholder={placeholderText}/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).toHaveAttribute('placeholder', placeholderText);
  });

  it('ne doit pas être requried par défaut', function () {
    // Given
    render(<InputAutocomplétion suggérer={() => []} afficher={() => ''} valeur={() => ''}/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).not.toHaveAttribute('required');
  });

  it('doit contenir un input avec required passé au composant', function () {
    // Given
    render(<InputAutocomplétion suggérer={() => []} afficher={() => ''} valeur={() => ''} required/>);

    // When
    const inputAutocomplétion = screen.getByRole('textbox');

    // Then
    expect(inputAutocomplétion).toHaveAttribute('required');
  });

  it('doit afficher des suggestions quand on commence à taper des trucs dans la textbox', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const débutDeTruc = 'Pari';

    function suggérerDesSuggestions(): string[] {
      return ['Paris', 'Marseille', 'Toulouse', 'Deauville'];
    }

    render(<InputAutocomplétion suggérer={suggérerDesSuggestions} afficher={identity} valeur={() => ''} label={labelText}/>);
    const inputAutocomplétion = screen.getByRole('textbox');

    // When
    await userEvent.type(inputAutocomplétion, débutDeTruc);

    // Then
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('Marseille')).toBeInTheDocument();
    expect(screen.getByText('Toulouse')).toBeInTheDocument();
    expect(screen.getByText('Deauville')).toBeInTheDocument();
  });

  it('doit choisir une suggestion quand on clique', async function () {
    // Given
    const labelText = 'Ma super autocomplétion';
    const débutDeTruc = 'Deauv';

    const suggérerDesSuggestions = (): string[] => ['Paris', 'Marseille', 'Toulouse', 'Deauville'];

    render(<InputAutocomplétion suggérer={suggérerDesSuggestions} afficher={identity} valeur={identity} label={labelText}/>);
    const inputAutocomplétion = screen.getByRole('textbox');
    await userEvent.type(inputAutocomplétion, débutDeTruc);

    // When
    await userEvent.click(screen.getByText('Deauville'));

    // Then
    expect(inputAutocomplétion).toHaveValue('Deauville');
  });
});
