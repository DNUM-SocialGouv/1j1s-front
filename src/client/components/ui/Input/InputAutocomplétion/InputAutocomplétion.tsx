import { SyntheticEvent, useState } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutocomplétionProps<T> {
  suggérer(préfixe: string): T[];

  afficher(suggestion: T): string;

  valeur(suggestion: T): string;

  callbakOnChange(event: SyntheticEvent, newValue: string): void;

  label?: string;
  placeholder?: string;
  required?: boolean;
}

export default function InputAutocomplétion<T>(props: AutocomplétionProps<T>) {
  const { suggérer, afficher, valeur, callbakOnChange, label, ...rest } = props;

  const [valeurInput, setValeurInput] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);

  function recalculerSuggestions({ value }: { value: string }) {
    setSuggestions(suggérer(value));
  }

  function viderSuggestions() {
    setSuggestions([]);
  }

  function onChange(event: SyntheticEvent, { newValue }: { newValue: string }) {
    setValeurInput(newValue);
    callbakOnChange(event, newValue);
  }

  const inputProps = {
    id: 'input-autocomplétion',
    onChange: onChange,
    value: valeurInput,
    ...rest,
  };

  return <>
    {label && <label htmlFor="input-autocomplétion">{label}</label>}
    <Autosuggest
      inputProps={inputProps}
      suggestions={suggestions}
      onSuggestionsFetchRequested={recalculerSuggestions}
      onSuggestionsClearRequested={viderSuggestions}
      getSuggestionValue={valeur}
      renderSuggestion={afficher}
    />
  </>;
}
