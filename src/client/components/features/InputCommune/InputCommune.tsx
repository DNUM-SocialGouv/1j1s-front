import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '~/client/components/features/InputLocalisation/InputLocalisation.module.css';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation.service';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

interface InputCommuneProps {
  code: string
  libellé: string
  latitude: string
  longitude: string
}

export const InputCommune = (props: InputCommuneProps) => {
  const { code, libellé, latitude, longitude } = props;
  const localisationService = useDependency<LocalisationService>('localisationService');

  const [suggestionIndex, setSuggestionIndex] = useState(1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [libelléCommune, setLibelléCommune] = useState<string>(libellé || '');
  const [codeCommune, setCodeCommune] = useState<string>(code || '');
  const [latitudeCommune, setLatitudeCommune] = useState<string>(latitude || '');
  const [longitudeCommune, setLongitudeCommune] = useState<string>(longitude || '');

  const [currentIndex, setCurrenIndex] = useState(0);

  const [communeList, setCommuneList] = useState([]);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const LOCALISATION_LABEL_ID = 'autocomplete-label';
  const LOCALISATION_SUGGESTIONS_ID = 'autocomplete-list-box';

  const clearCommune = useCallback(() => {
    setCodeCommune('');
    setLatitudeCommune('');
    setLongitudeCommune('');
    setLibelléCommune('');
  }, []);

  const cancelCommuneSelect = useCallback(() => {
    if (codeCommune === '') {
      clearCommune();
    }
    setSuggestionsActive(false);
  }, [codeCommune, clearCommune]);

  const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(autocompleteRef.current)?.contains(e.target as Node)) {
      cancelCommuneSelect();
    }
  }, [autocompleteRef, cancelCommuneSelect]);

  const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
      cancelCommuneSelect();
    }
  }, [cancelCommuneSelect]);

  useEffect(() => {
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  }, [closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  useEffect(() => {
    if (libelléCommune === '') {
      clearCommune();
    }
  }, [libelléCommune, codeCommune, clearCommune]);

  useEffect(() => {
    if (libellé === '' || code === '') {
      clearCommune();
    } else {
      setCodeCommune(code);
      setLatitudeCommune(latitude);
      setLongitudeCommune(longitude);
      setLibelléCommune(libellé);
    }
  }, [libellé, code, longitude, latitude, clearCommune]);

  const rechercherCommune = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const response  = await localisationService.rechercherCommune(value);
    if(response.instance === 'success') {
      setCommuneList(response.result.résultats ?? []);
      setCodeCommune('');
      setLatitudeCommune('');
      setLongitudeCommune('');
      setSuggestionsActive(value.length > 1);
      setSuggestionIndex(1);
    } else {
      // TODO: implement error management
    }

  }, [localisationService]);

  const handleChange = useMemo(() => {
    return debounce(rechercherCommune, 300);
  }, [rechercherCommune]);

  useEffect(() => {
    return () => {
      handleChange.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSuggestionListEmpty = useCallback(() => {
    return !communeList.length;
  }, [communeList]);

  const handleClick = (commune: Commune) => {
    setLibelléCommune(commune.libelle);
    setCodeCommune(commune.code);
    setLatitudeCommune(commune.coordonnées.lat.toString());
    setLongitudeCommune(commune.coordonnées.lon.toString());
    setSuggestionsActive(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ARROW_UP) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    } else if (event.key === KeyBoard.ARROW_DOWN) {
      setSuggestionIndex(suggestionIndex + 1);
    } else if (event.key === KeyBoard.ENTER) {
      event.preventDefault();


      if (!isSuggestionListEmpty() && ((codeCommune === '') || (libelléCommune && libelléCommune !== `${communeList[currentIndex].code}`))) {
        if (communeList) {
          setCodeCommune(communeList[currentIndex].code);
          setLatitudeCommune(communeList[currentIndex].coordonnées.lat);
          setLongitudeCommune(communeList[currentIndex].coordonnées.lon);
          setLibelléCommune(communeList[currentIndex].libelle);
        }
        setSuggestionsActive(false);
      }
    }
  };

  const SuggestionCommuneListItem = (suggestion: Commune, currentHoverIndex: number, index: number) => {
    if (currentHoverIndex === suggestionIndex) {
      setTimeout(() => setCurrenIndex(index), 0);
    }

    return (
      <li
        className={currentHoverIndex === suggestionIndex ? styles.hover : ''}
        key={currentHoverIndex}
        onClick={() => handleClick(suggestion)}
        role="option"
        aria-selected={libelléCommune === suggestion.libelle}
        value={suggestion.libelle}
      >
        {suggestion.libelle}
      </li>
    );
  };

  function SuggestionsCommuneList() {
    let currentHoverIndex = 0;
    return (
      <ul
        className={styles.suggestionLocalisationList}
        role="listbox"
        aria-labelledby={LOCALISATION_LABEL_ID}
        id={LOCALISATION_SUGGESTIONS_ID}
        data-testid="RésultatsCommune"
      >
        {communeList.length > 0 &&
        <li className={styles.catégorieRésultatLocalisation}><strong>Communes</strong></li>}
        {communeList.map((suggestion, index) => {
          currentHoverIndex++;
          return SuggestionCommuneListItem(suggestion, currentHoverIndex, index);
        })}
        {communeList.length === 0 &&
        <li className={styles.aucunRésultatLocalisation} data-testid="CommuneNoResultMessage">
          Aucune proposition ne correspond à votre saisie.
          Vérifiez que votre saisie correspond bien à un lieu.
          Exemple : Paris, ...
        </li>
        }
      </ul>
    );
  }

  return (
    <div className={styles.wrapper}>
      <label className="fr-label" htmlFor="rechercherCommune" id={LOCALISATION_LABEL_ID}>
        Commune
      </label>
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
            id="rechercherCommune"
            name="libelleCommune"
            data-testid="InputCommune"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={LOCALISATION_SUGGESTIONS_ID}
            aria-activedescendant="rechercherCommune"
            placeholder={'Exemple: Paris, Béziers...'}
            className={['fr-input', styles.libelleLocalisationInput].join(' ')}
            value={libelléCommune}
            onChange={(event) => {
              setLibelléCommune(event.target.value);
              handleChange(event);
            }}
            onKeyDown={handleKeyDown}
            onClick={() => setSuggestionsActive(!!codeCommune)}
          />
          <input type="hidden" name="codeCommune" value={codeCommune} data-testid="codeCommune" />
          <input type="hidden" name="latitudeCommune" value={latitudeCommune} data-testid="latitudeCommune" />
          <input type="hidden" name="longitudeCommune" value={longitudeCommune} data-testid="longitudeCommune" />
        </div>
        {suggestionsActive && <SuggestionsCommuneList/>}
      </div>
    </div>
  );
};
