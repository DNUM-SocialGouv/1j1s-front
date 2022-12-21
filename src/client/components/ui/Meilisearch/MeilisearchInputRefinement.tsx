// eslint-disable-next-line import/named
import { RefinementListItem } from 'instantsearch.js/es/connectors/refinement-list/connectRefinementList';
import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
// eslint-disable-next-line import/named
import { useRefinementList, UseRefinementListProps } from 'react-instantsearch-hooks-web';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/ui/Meilisearch/MeilisearchInputRefinement.module.scss';

function listeDeLocalisations(listeDeLocalisationsPossibles: RefinementListItem[], saisieUtilisateur: string) {
  return listeDeLocalisationsPossibles
    .filter(({ value, isRefined }) =>
      !isRefined && value.toLowerCase().includes(saisieUtilisateur.toLowerCase()))
    .map(({ value }) => value);
}

export function MeilisearchInputRefinement(props: UseRefinementListProps) {
  const { refine, items } = useRefinementList(props);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [localisation, setLocalisation] = useState<string>('');
  const [suggestionsActive, setSuggestionsActive] = useState(false);

  const LOCALISATION_LABEL_ID = 'autocomplete-label';
  const LOCALISATION_SUGGESTIONS_ID = 'autocomplete-list-box';

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const clearLocalisation = useCallback(() => {
    setLocalisation('');
  }, []);

  const cancelLocalisationSelect = useCallback(() => {
    if (localisation === '') {
      clearLocalisation();
    }
    setSuggestionsActive(false);
  }, [localisation, clearLocalisation]);

  const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(autocompleteRef.current)?.contains(e.target as Node)) {
      cancelLocalisationSelect();
    }
  }, [autocompleteRef, cancelLocalisationSelect]);

  const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
      cancelLocalisationSelect();
    }
  }, [cancelLocalisationSelect]);

  useEffect(function gérerPerteDeFocus() {
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  }, [closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  useEffect(function réinitialiserLocalisation() {
    if (localisation === '') {
      clearLocalisation();
    }
  }, [localisation, clearLocalisation]);

  const rechercherLocalisation = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSuggestionsActive(value.length > 0);
    setSuggestionIndex(0);
  };

  const handleClick = (value: string) => {
    setSuggestionsActive(false);
    refineAndResetValue(value);
  };

  const refineAndResetValue = (value: string) => {
    refine(value);
    setLocalisation('');
    setSuggestionsActive(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!suggestionsActive && event.key === KeyBoard.ENTER) {
      return;
    }
    if (event.key === KeyBoard.ARROW_UP) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    } else if (event.key === KeyBoard.ARROW_DOWN) {
      if (suggestionIndex === listeDeLocalisations(items, localisation).length - 1) {
        return;
      }
      setSuggestionIndex(suggestionIndex + 1);
    } else if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
      refineAndResetValue(listeDeLocalisations(items, localisation)[suggestionIndex]);
    }
  };

  function SuggestionsLocalisationList() {
    return (
      <ul
        className={styles.suggestionList}
        role="listbox"
        aria-labelledby={LOCALISATION_LABEL_ID}
        id={LOCALISATION_SUGGESTIONS_ID}
        data-testid="RésultatsLocalisation"
      >
        {listeDeLocalisations(items, localisation)
          .map((suggestion, index) => (
            <li
              className={index === suggestionIndex ? styles.hover : ''}
              key={index}
              onClick={() => handleClick(suggestion)}
              role="option"
              aria-selected={localisation === suggestion}
              value={suggestion}
            >
              {suggestion}
            </li>
          ))}
        {listeDeLocalisations(items, localisation).length === 0 &&
                <li className={styles.aucunRésultat} data-testid="LocalisationNoResultMessage">
                    Aucune proposition ne correspond à votre saisie.
                    Vérifiez que votre saisie correspond bien à un lieu.
                    Exemple : Paris, ...
                </li>
        }
      </ul>
    );
  }

  return (
    <>
      <div className={styles.formInput}>
        <label htmlFor="rechercherLocalisation" id={LOCALISATION_LABEL_ID}>Localisation</label>
        <div ref={autocompleteRef}>
          <div
            id="header-search"
            role="combobox"
            aria-expanded={suggestionsActive}
            aria-controls={LOCALISATION_SUGGESTIONS_ID}
            aria-owns={LOCALISATION_SUGGESTIONS_ID}
            aria-haspopup="listbox"
          >
            <input
              type="text"
              id="rechercherLocalisation"
              name="inputLocalisation"
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls={LOCALISATION_SUGGESTIONS_ID}
              aria-activedescendant="rechercherLocalisation"
              placeholder={'Exemple : Toulouse, Paris...'}
              className={styles.formControlInput}
              value={localisation}
              onChange={(event) => {
                setLocalisation(event.target.value);
                rechercherLocalisation(event);
              }}
              onKeyDown={handleKeyDown}
              onClick={() => setSuggestionsActive(!!localisation)}
            />
          </div>
          {suggestionsActive && <SuggestionsLocalisationList/>}
        </div>
      </div>
    </>
  );
}
