import React, { ChangeEvent, useState } from 'react';

import styles from '~/client/components/Autocompletion/Autocompletion.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface AutocompletionProps {
  suggestionList: string[];
  placeholder?: string;
  inputName: string;
  icon?: string;
}
export const Autocompletion = (props: AutocompletionProps) => {
  const { suggestionList, inputName, placeholder, icon } = props;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValue(value);
    if (value.length > 1) {
      const filterSuggestions = suggestionList.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(value) > -1,
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { innerText } = e.target as HTMLElement;
    setSuggestions([]);
    setValue(innerText);
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
      setValue(suggestions[suggestionIndex]);
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
      >
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? styles.active : ''}
              key={index}
              onClick={handleClick}
              role="option"
              aria-selected={false}
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <label className={['hide', 'fr-label'].join(' ')} htmlFor={inputName} id={label}>
        Recherche
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
            aria-autocomplete="list"
            aria-controls={listbox}
            aria-activedescendant={inputName}
            placeholder={placeholder ?? 'Rechercher'}
            className="fr-input"
            value={value}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
          <span
            className={['fr-btn', icon ?? 'fr-icon-zoom-line'].join(' ')}
            aria-hidden="true"
          />
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
