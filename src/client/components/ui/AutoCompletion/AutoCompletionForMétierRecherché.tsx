import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles from '~/client/components/ui/AutoCompletion/AutoCompletion.module.css';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

interface AutoCompletionForMétierRecherchéProps {
  placeholder?: string;
  inputName: string;
  inputIntituleMétier: string;
  className?: string;
  handleErrorMessageActive: boolean;
  resetHandleErrorMessageActive: () => void;
}

export const AutoCompletionForMétierRecherché = (props: AutoCompletionForMétierRecherchéProps) => {
  const { inputName, placeholder, className, handleErrorMessageActive, resetHandleErrorMessageActive, inputIntituleMétier } = props;

  const métierRecherchéService = useDependency<MétierRecherchéService>('métierRecherchéService');

  const [suggestionList, setSuggestionList] = useState<MétierRecherché[]>([]);
  const [suggestions, setSuggestions] = useState<MétierRecherché[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [errorMessageActive, setErrorMessageActive] = useState(false);
  const [value, setValue] = useState('');
  const [inputHiddenSelectedCodeRomes, setInputHiddenSelectedCodeRomes] = useState<string[]>([]);
  const [inputHiddenSelectedMétierIntitulé, setInputHiddenSelectedMétierIntitulé] = useState<string>('');

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(autocompleteRef.current)?.contains(e.target as Node)) {
      if(inputHiddenSelectedCodeRomes.length === 0 && inputHiddenSelectedMétierIntitulé === '') {
        setValue('');
      }
      setSuggestionsActive(false);
    }
  }, [autocompleteRef, inputHiddenSelectedMétierIntitulé, inputHiddenSelectedCodeRomes]);

  const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
      if(inputHiddenSelectedCodeRomes.length === 0 && inputHiddenSelectedMétierIntitulé === '') {
        setValue('');
      }
      setSuggestionsActive(false);
    }
  }, [inputHiddenSelectedMétierIntitulé, inputHiddenSelectedCodeRomes]);

  useEffect(() => {
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  },[closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  useEffect(() => {
    if (inputIntituleMétier !== '') {
      setValue(inputIntituleMétier);
    }
    setErrorMessageActive(handleErrorMessageActive);
  }, [handleErrorMessageActive, inputIntituleMétier]);

  async function rechercherIntituléMétier(intitulé: string) {
    setValue(intitulé);
    if (intitulé.length !== 0) {
      const response = await métierRecherchéService.rechercherMétier(intitulé);
      setSuggestionList(response);
      setErrorMessageActive(false);
      setSuggestionIndex(0);
    }
  }

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value } = e.target;
    await rechercherIntituléMétier(value);
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

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedMétierRecherché: MétierRecherché) => {
    e.preventDefault();
    setSuggestions([]);
    setValue(selectedMétierRecherché.intitulé);
    setInputHiddenSelectedCodeRomes(selectedMétierRecherché.codeROMEList);
    setInputHiddenSelectedMétierIntitulé(selectedMétierRecherché.intitulé);
    setSuggestionsActive(false);
  };

  const handleClickResetErrorMessageDisplay = () => {
    resetHandleErrorMessageActive();
    setErrorMessageActive(false);
    setInputHiddenSelectedCodeRomes([]);
    setInputHiddenSelectedMétierIntitulé('');
    setSuggestionsActive(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ARROW_UP) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    } else if (event.key === KeyBoard.ARROW_DOWN) {
      if (suggestionIndex + 1 === suggestions.length) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    } else if (event.key === KeyBoard.ENTER && suggestionsActive) {
      setValue(suggestions[suggestionIndex].intitulé);
      setInputHiddenSelectedCodeRomes(suggestions[suggestionIndex].codeROMEList);
      setInputHiddenSelectedMétierIntitulé(suggestions[suggestionIndex].intitulé);
      setSuggestionsActive(false);
      event.preventDefault();
    }
  };

  const Suggestions = () => {
    return suggestionList.length === 0 ?
      (
        <span className={styles.autocompletionSuggestion} data-testid="MétierRecherchéNoResultMessage">
            Aucune proposition ne correspond à votre saisie. Vérifiez que votre saisie correspond bien à un métier. Exemple : boulangerie, cuisine...
        </span>
      ) : (
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
                onClick={(event) => handleClick(event, suggestion)}
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
    <div className={className}>
      <label className="fr-label" htmlFor={inputName} id={label}>
        Secteur, domaine, mot-clé... {errorMessageActive && <span data-testid="RequiredFieldErrorMessage" className={styles.errorMessageLabelRechercheMétier}>(Le champ est requis)</span>}
      </label>
      <div ref={autocompleteRef} className={errorMessageActive ? styles.errorMessageInputRechercheMétier : ''}>
        <div
          className="fr-search-bar"
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
            placeholder={placeholder ?? 'Commencez à taper votre mot puis sélectionnez un des choix proposés'}
            className={['fr-input', styles.autocompletionInput].join(' ')}
            value={value}
            onClick={handleClickResetErrorMessageDisplay}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          <input type="hidden" value={inputHiddenSelectedCodeRomes} name="codeRomes"/>
          <input type="hidden" value={inputHiddenSelectedMétierIntitulé} name="metierSelectionne"/>
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
