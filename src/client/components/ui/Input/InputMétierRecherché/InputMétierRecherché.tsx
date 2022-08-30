import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { Icon } from '~/client/components/ui/Icon/Icon';
import styles from '~/client/components/ui/Input/Input.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { MétierRecherchéService } from '~/client/services/alternances/métierRecherché.service';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { MétierRecherché } from '~/server/alternances/domain/métierRecherché';

interface InputMétierRecherchéProps {
  libellé: string;
  handleErrorMessageActive: boolean;
  resetHandleErrorMessageActive: () => void;
  code: string[]
}

export const InputMétierRecherché = (props: InputMétierRecherchéProps) => {
  const {
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
    const métierRecherchéList = await métierRecherchéService.rechercherMétier(value);
    setSuggestions(métierRecherchéList);
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
        className={styles.suggestionList}
        role="listbox"
        aria-labelledby={label}
        id={listbox}
        data-testid="RésultatsRechercheMétier"
      >
        {suggestions.length > 0 && suggestions.map((suggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? styles.hover : ''}
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
        <li className={styles.aucunRésultat} data-testid="MétierRecherchéNoResultMessage">
          Aucune proposition ne correspond à votre saisie.
          Vérifiez que votre saisie correspond bien à un métier.
          Exemple : boulangerie, cuisine...
        </li>
        }
      </ul>
    );
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="rechercherMétier" id={label}>
        Métier, mot-clé {errorMessageActive ? <span className={styles.instructionMessageError}>(champ obligatoire)</span>: <span className={styles.instructionMessage}>(champ obligatoire)</span>}
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
            placeholder={'Exemple: informatique, boulanger...'}
            className={classNames(styles.formControlInput, errorMessageActive && styles.formControlInputError)}
            value={libelléMétier}
            onClick={handleClickResetErrorMessageDisplay}
            onChange={(event) => {
              setLibelléMétier(event.target.value);
              handleChange(event);
            }}
            onKeyDown={handleKeyDown}
            autoComplete="off"
          />
          { errorMessageActive
            ?
            <span className={styles.instructionMessageError}>
              Le champ est obligatoire - veuillez saisir un mot-clé
            </span>
            :
            <span className={styles.instructionMessage}>
              <Icon name="information"/>
              Commencez à taper votre mot puis sélectionnez un métier
            </span>
          }
          <input type="hidden" value={codeRomesMétier} name="codeRomes"/>
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
