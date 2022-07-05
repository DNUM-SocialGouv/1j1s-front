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
  libellé: string;
  className?: string;
  handleErrorMessageActive: boolean;
  resetHandleErrorMessageActive: () => void;
  code: Array<string>
}

export const AutoCompletionForMétierRecherché = (props: AutoCompletionForMétierRecherchéProps) => {
  const {
    className,
    handleErrorMessageActive,
    resetHandleErrorMessageActive,
    libellé,
    code,
  } = props;

  const métierRecherchéService = useDependency<MétierRecherchéService>('métierRecherchéService');

  const [suggestions, setSuggestions] = useState<MétierRecherché[]>([]);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [errorMessageActive, setErrorMessageActive] = useState(false);
  const [libelléMétier, setLibelléMétier] = useState(libellé || '');
  const [codeRomesMétier, setCodeRomesMétier] = useState<string[]>(code || []);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const clearMétierRecherché = useCallback(() => {
    setLibelléMétier('');
    setCodeRomesMétier([]);
  }, []);

  const cancelMétierRecherchéSelect = useCallback(() => {
    if(codeRomesMétier.length === 0) {
      clearMétierRecherché();
    }
    setSuggestionsActive(false);
  }, [codeRomesMétier, clearMétierRecherché]);

  const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(autocompleteRef.current)?.contains(e.target as Node)) {
      cancelMétierRecherchéSelect();
    }
  }, [autocompleteRef, cancelMétierRecherchéSelect]);

  const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
      cancelMétierRecherchéSelect();
    }
  }, [cancelMétierRecherchéSelect]);

  useEffect(function gérerPerteDeFocus() {
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  }, [closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  useEffect(() => {
    return () => {
      handleChange.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(function réinitialiserMétierRecherché() {
    if (libelléMétier === '') {
      clearMétierRecherché();
    }
    setErrorMessageActive(handleErrorMessageActive);
  }, [handleErrorMessageActive, libelléMétier, clearMétierRecherché]);

  useEffect(function initialiserMétierRecherché() {
    if (libellé === '' || code.length === 0) {
      clearMétierRecherché();
    } else {
      setLibelléMétier(libellé);
      setCodeRomesMétier(code);
    }
  }, [libellé, code, clearMétierRecherché]);

  const rechercherIntituléMétier = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const response = await métierRecherchéService.rechercherMétier(value);
    const filterSuggestions = response.filter(
      (suggestion) => suggestion.intitulé.toLowerCase().indexOf(value) > -1,
    );
    setSuggestions(filterSuggestions);
    setSuggestionIndex(0);
    setErrorMessageActive(false);
    setCodeRomesMétier([]);
    setSuggestionsActive(value.length > 1);


  }, [métierRecherchéService]);

  const handleChange = useMemo(() => {
    return debounce(rechercherIntituléMétier, 300);
  }, [rechercherIntituléMétier]);

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, selectedMétierRecherché: MétierRecherché) => {
    setLibelléMétier(selectedMétierRecherché.intitulé);
    setCodeRomesMétier(selectedMétierRecherché.codeROMEList);
    setSuggestionsActive(false);
  };

  const handleClickResetErrorMessageDisplay = () => {
    resetHandleErrorMessageActive();
    setErrorMessageActive(false);
    setCodeRomesMétier(code || []);
    setLibelléMétier(libellé || '');
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
      event.preventDefault();
      setLibelléMétier(suggestions[suggestionIndex].intitulé);
      setCodeRomesMétier(suggestions[suggestionIndex].codeROMEList);
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
      <label className="fr-label" htmlFor="rechercherMétier" id={label}>
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
            id="rechercherMétier"
            name="metierSelectionne"
            data-testid="InputRechercheMétier"
            aria-autocomplete="list"
            aria-controls={listbox}
            aria-activedescendant="rechercherMétier"
            placeholder={'Commencez à taper votre mot puis sélectionnez un des choix proposés'}
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
          <input type="hidden" value={codeRomesMétier} name="codeRomes"/>
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
