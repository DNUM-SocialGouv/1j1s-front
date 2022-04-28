import React, { ChangeEvent, useState } from 'react';

import { KeyBoard } from '~/client/utils/keyboard.util';
import styles from '~/styles/Autocompletion.module.css';

interface AutocompletionProps {
  data: string[];
  placeholder?: string;
  inputName: string;
  icon?: string;
}
export const Autocompletion = (props: AutocompletionProps) => {
  const { data, inputName, placeholder, icon } = props;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const query = value.toLowerCase();
    setValue(query);
    if (query.length > 1) {
      const filterSuggestions = data.filter(
        (suggestion) => suggestion.toLowerCase().indexOf(query) > -1,
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e: ChangeEvent<HTMLSelectElement>) => {
    const { innerText } = e.target;
    setSuggestions([]);
    setValue(innerText);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
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
      <label className={[styles.label, 'fr-label'].join(' ')} htmlFor={inputName} id={label}>
        Recherche
      </label>
      <div className={styles.container}>
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
            aria-activedescendant
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
