import React, { ChangeEvent, useState } from 'react';

import styles from '~/client/components/ui/AutoCompletion/AutoCompletion.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

interface AutoCompletionForMétierRecherchéProps {
  suggestionList: MétierRecherché[];
  placeholder?: string;
  inputName: string;
  onChange: (value: string) => void;
}

export const AutoCompletionForMTierRecherch = (props: AutoCompletionForMétierRecherchéProps) => {
  const { suggestionList, inputName, placeholder, onChange } = props;

  const [suggestions, setSuggestions] = useState<MétierRecherché[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');
  const [inputHiddenSelectedMétier, setInputHiddenSelectedMétier] = useState<string[]>([]);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    onChange(value);
    setValue(value);
    if (value.length > 1) {
      const filterSuggestions = suggestionList.filter(
        (suggestion) => suggestion.intitulé.toLowerCase().indexOf(value) > -1,
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedValue: string[]) => {
    const { innerText } = e.target as HTMLElement;
    setSuggestions([]);
    setValue(innerText);
    setInputHiddenSelectedMétier(selectedValue);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ARROW_UP) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    else if (event.key === KeyBoard.ARROW_DOWN) {
      if (suggestionIndex + 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    else if (event.key === KeyBoard.ENTER) {
      setValue(suggestions[suggestionIndex].intitulé);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul
        className={styles.autocompletionSuggestion}
        role="listbox"
        aria-labelledby={label}
        id={listbox}
        data-testid="RésultatsRechercheMétier"
      >
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? styles.active : ''}
              key={index}
              onClick={(event) => handleClick(event, suggestion.codeROMEList)}
              role="option"
              aria-selected={false}
            >
              {suggestion.intitulé}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <label className={'fr-label'} htmlFor={inputName} id={label}>
        Métier
      </label>
      <div>
        <div
          className='fr-search-bar'
          id="header-search"
          role="combobox"
          aria-expanded={suggestionsActive}
          aria-controls={listbox}
          aria-owns={listbox}
          aria-haspopup="listbox"
        >
          <input
            type="text"
            id={inputName}
            data-testid="InputRechercheMétier"
            aria-autocomplete="list"
            aria-controls={listbox}
            aria-activedescendant={inputName}
            placeholder={placeholder ?? 'Rechercher'}
            className="fr-input"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <input type="hidden" value={inputHiddenSelectedMétier} name="codeRomes"/>
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
