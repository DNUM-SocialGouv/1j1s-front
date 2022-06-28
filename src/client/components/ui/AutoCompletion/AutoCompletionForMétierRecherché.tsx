import debounce from 'lodash/debounce';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import styles from '~/client/components/ui/AutoCompletion/AutoCompletion.module.css';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

interface AutoCompletionForMétierRecherchéProps {
  placeholder?: string;
  inputName: string;
  libellé: string;
  className?: string;
  handleErrorMessageActive: boolean;
  resetHandleErrorMessageActive: () => void;
  code: string
}

export const AutoCompletionForMétierRecherché = (props: AutoCompletionForMétierRecherchéProps) => {
  const {
    inputName,
    placeholder,
    className,
    handleErrorMessageActive,
    resetHandleErrorMessageActive,
    libellé,
    code,
  } = props;

  const métierRecherchéService = useDependency<MétierRecherchéService>('métierRecherchéService');

  // const [suggestionList, setSuggestionList] = useState<MétierRecherché[]>([]);
  const [suggestions, setSuggestions] = useState<MétierRecherché[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [errorMessageActive, setErrorMessageActive] = useState(false);
  const [libelléMétier, setLibelléMétier] = useState(libellé || '');
  const [inputHiddenSelectedCodeRomes, setInputHiddenSelectedCodeRomes] = useState<string[]>(code.split(',') || []);
  const [inputHiddenSelectedMétierIntitulé, setInputHiddenSelectedMétierIntitulé] = useState<string>('');

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(autocompleteRef.current)?.contains(e.target as Node)) {
      if(inputHiddenSelectedCodeRomes.length === 0 && inputHiddenSelectedMétierIntitulé === '') {
        setLibelléMétier('');
      }
      setSuggestionsActive(false);
    }
  }, [autocompleteRef, inputHiddenSelectedMétierIntitulé, inputHiddenSelectedCodeRomes]);

  const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
      if(inputHiddenSelectedCodeRomes.length === 0 && inputHiddenSelectedMétierIntitulé === '') {
        setLibelléMétier('');
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

  const clearMétierRecherché = useCallback(() => {
    setInputHiddenSelectedMétierIntitulé('');
    setInputHiddenSelectedCodeRomes([]);
  }, []);

  useEffect(() => {
    if (libelléMétier === '') {
      clearMétierRecherché();
    }
    setErrorMessageActive(handleErrorMessageActive);
  }, [handleErrorMessageActive, libelléMétier, code, libellé, clearMétierRecherché]);

  useEffect(() => {
    if (libellé === '' || code.length === 0) {
      clearMétierRecherché();
    } else {
      setInputHiddenSelectedMétierIntitulé(libellé);
      setInputHiddenSelectedCodeRomes(code.split(','));
    }
  }, [libellé, code, clearMétierRecherché]);

  const rechercherIntituléMétier = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 1) {
      const response = await métierRecherchéService.rechercherMétier(value);
      const filterSuggestions = response.filter(
        (suggestion) => suggestion.intitulé.toLowerCase().indexOf(value) > -1,
      );
      setSuggestions(filterSuggestions);
      setSuggestionsActive(true);
      setErrorMessageActive(false);
      setSuggestionIndex(0);
      setInputHiddenSelectedMétierIntitulé('');
      setInputHiddenSelectedCodeRomes([]);
    }

  }, [métierRecherchéService]);

  const handleChange = useMemo(() => {
    return debounce(rechercherIntituléMétier, 300);
  }, [rechercherIntituléMétier]);



  const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedMétierRecherché: MétierRecherché) => {
    e.preventDefault();
    setSuggestions([]);
    setLibelléMétier(selectedMétierRecherché.intitulé);
    setInputHiddenSelectedCodeRomes(selectedMétierRecherché.codeROMEList);
    setInputHiddenSelectedMétierIntitulé(selectedMétierRecherché.intitulé);
    setSuggestionsActive(false);
  };

  const handleClickResetErrorMessageDisplay = () => {
    resetHandleErrorMessageActive();
    setErrorMessageActive(false);
    setInputHiddenSelectedCodeRomes(code.split(',') || []);
    setInputHiddenSelectedMétierIntitulé(libellé || '');
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
      setLibelléMétier(suggestions[suggestionIndex].intitulé);
      setInputHiddenSelectedCodeRomes(suggestions[suggestionIndex].codeROMEList);
      setInputHiddenSelectedMétierIntitulé(suggestions[suggestionIndex].intitulé);
      setSuggestionsActive(false);
      event.preventDefault();
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
        {suggestions.length > 0 && suggestions.map((suggestion, index) => {
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
        {suggestions.length === 0 &&
        <li className={styles.noSuggestion} data-testid="MétierRecherchéNoResultMessage">
          Aucune proposition ne correspond à votre saisie.
          Vérifiez que votre saisie correspond bien à un métier.
          Exemple : boulangerie, cuisine...
        </li>
        }
      </ul>
    );
  };

  return (
    <div className={className}>
      <label className="fr-label" htmlFor={inputName} id={label}>
        Secteur, domaine, mot-clé {errorMessageActive && <span data-testid="RequiredFieldErrorMessage" className={styles.errorMessageLabelRechercheMétier}>(Le champ est requis)</span>}
      </label>
      <div ref={autocompleteRef}>
        <div
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
            className={['fr-input', styles.autocompletionInput, errorMessageActive ? 'fr-input--error' : ''].join(' ')}
            value={libelléMétier}
            onClick={handleClickResetErrorMessageDisplay}
            onChange={(event) => {
              setLibelléMétier(event.target.value);
              handleChange(event);
            }}
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
