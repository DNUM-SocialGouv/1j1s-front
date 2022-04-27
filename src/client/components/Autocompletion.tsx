import React, { ChangeEvent, useState } from 'react';

import styles from '~/styles/Autocompletion.module.css';

interface DataProps {
  data: string[];
  placeholder?: string;
  inputName: string;
  icon?: string;
}
export const Autocompletion = (props: DataProps) => {
  const { data, inputName, placeholder, icon } = props;

  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');

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

  const handleKeyDown = (e: KeyboardEvent) => {
    // UP ARROW
    if (e.keyCode === 38) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    // DOWN ARROW || TAB
    else if (e.keyCode === 40 || e.keyCode === 9) {
      if (suggestionIndex - 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    }
    // ENTER
    else if (e.keyCode === 13) {
      setValue(suggestions[suggestionIndex]);
      setSuggestionIndex(0);
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    return (
      <ul
        className={styles.autocompletionSuggestion}
        role="listbox"
        aria-labelledby="autocomplete-label"
        id="autocomplete-listbox"
      >
        {suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? 'active' : ''}
              key={index}
              onClick={() => handleClick}
              role="option"
            >
              {suggestion}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <>
      <label className="fr-label" htmlFor={inputName} id="autocomplete-label">
        Recherche
      </label>
      <div className={styles.container}>
        <div
          className={['fr-search-bar'].join(' ')}
          id="header-search"
          role="combobox"
          aria-expanded={suggestionsActive}
          aria-owns="autocomplete-listbox"
          aria-haspopup="listbox"
        >
          <input
            type="text"
            id={inputName}
            aria-autocomplete="list"
            aria-controls="autocomplete-listbox"
            placeholder={placeholder ?? 'Rechercher'}
            className="fr-input"
            value={value}
            onChange={() => handleChange}
            onKeyDown={() => handleKeyDown}
          />
          <span
            className={['fr-btn', icon ?? 'fr-icon-zoom-line'].join(' ')}
            aria-hidden="true"
          />
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </>
  );
};
