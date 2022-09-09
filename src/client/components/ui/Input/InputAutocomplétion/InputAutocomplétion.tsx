import debounce from 'lodash/debounce';
import { ReactElement, SyntheticEvent, useMemo, useState } from 'react';
import Autosuggest from 'react-autosuggest';

interface AutocomplétionProps<T> {
  suggérer(préfixe: string): Promise<T[]>;

  afficher(suggestion: T): string | ReactElement;

  valeur(suggestion: T): string;

  onChange?(event: SyntheticEvent, newValue: string): () => any;

  onSuggestionSelected?(event: SyntheticEvent, suggestion: T, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string): () => void;

  label?: string;
  debounce?: number;
  name?: string;
  placeholder?: string;
  required?: boolean;
}

export default function InputAutocomplétion<T>(props: AutocomplétionProps<T>) {
  const {
    suggérer,
    afficher,
    valeur,
    onChange: onChangeCallback,
    onSuggestionSelected: onSuggestionSelectedCallback,
    debounce: debounceTimeout = 200,
    label,
    ...rest
  } = props;

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

  function onSuggestionSelected(event: SyntheticEvent, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }:
    { suggestion: T, suggestionValue: string, suggestionIndex: number, sectionIndex: number | null, method: string }) {
    onSuggestionSelectedCallback?.(event, suggestion, suggestionValue, suggestionIndex, sectionIndex, method);
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
      onSuggestionSelected={onSuggestionSelected}
      getSuggestionValue={valeur}
      renderSuggestion={afficher}
    />
  </>;
}
