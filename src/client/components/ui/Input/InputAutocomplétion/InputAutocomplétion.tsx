import debounce from 'lodash/debounce';
import { ReactElement, SyntheticEvent, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutocomplétionProps<T> {
  suggérer(préfixe: string): Promise<T[]>;

  afficher(suggestion: T): string | ReactElement;

  valeur(suggestion: T): string;

  onChange?(event: SyntheticEvent, newValue: string): () => any;

  label?: string;
  debounce?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function InputAutocomplétion<T>(props: AutocomplétionProps<T>) {
  const { suggérer, afficher, valeur, onChange: onChangeCallback, debounce: debounceTimeout = 200, label, ...rest } = props;

  const [valeurInput, setValeurInput] = useState('');
  const [suggestions, setSuggestions] = useState<T[]>([]);

  const recalculerSuggestions = useMemo(() => {
    return debounce(async ({ value }: { value: string }) => setSuggestions(await suggérer(value)), debounceTimeout);
  }, [suggérer]);

  function viderSuggestions() {
    setSuggestions([]);
  }

  function onChange(event: SyntheticEvent, { newValue }: { newValue: string }) {
    setValeurInput(newValue);
    onChangeCallback?.(event, newValue);
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
