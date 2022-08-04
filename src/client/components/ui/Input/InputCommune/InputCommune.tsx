import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import styles from '~/client/components/ui/Input/Input.module.css';
import { Select } from '~/client/components/ui/Select/Select';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation.service';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { récupérerLibelléDepuisValeur } from '~/client/utils/récupérerLibelléDepuisValeur.utils';
import { radiusList } from '~/server/localisations/domain/localisation';
import { Commune } from '~/server/localisations/domain/localisationAvecCoordonnées';

interface InputCommuneProps {
  code: string
  libellé: string
  latitude: string
  longitude: string
  distance: string
}

export const InputCommune = (props: InputCommuneProps) => {
  const { code, libellé, latitude, longitude, distance } = props;

  const localisationService = useDependency<LocalisationService>('localisationService');

  const [suggestionIndex, setSuggestionIndex] = useState(1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [libelléCommune, setLibelléCommune] = useState<string>(libellé || '');
  const [codeCommune, setCodeCommune] = useState<string>(code || '');
  const [latitudeCommune, setLatitudeCommune] = useState<string>(latitude || '');
  const [longitudeCommune, setLongitudeCommune] = useState<string>(longitude || '');
  const [distanceCommune, setDistanceCommune] = useState<string>(distance || '');

  const [communeList, setCommuneList] = useState<Commune[]>([]);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const LOCALISATION_LABEL_ID = 'autocomplete-label';
  const LOCALISATION_SUGGESTIONS_ID = 'autocomplete-list-box';

  const DEFAULT_RADIUS_VALUE = '10';

  const clearCommune = useCallback(() => {
    setCodeCommune('');
    setLatitudeCommune('');
    setDistanceCommune('');
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

  useEffect(function gérerPerteDeFocus() {
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  }, [closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  useEffect(function réinitialiserCommune() {
    if (libelléCommune === '') {
      clearCommune();
    }
  }, [libelléCommune, clearCommune]);

  useEffect(function initialiserCommune() {
    if (libellé === '' || code === '') {
      clearCommune();
    } else {
      setCodeCommune(code);
      setLatitudeCommune(latitude);
      setDistanceCommune(distance);
      setLongitudeCommune(longitude);
      setLibelléCommune(libellé);
    }
  }, [libellé, code, longitude, latitude, distance, clearCommune]);

  const rechercherCommune = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 1) {
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
    }
  }, [localisationService]);

  const debounceRechercheCommune = useMemo(() => {
    return debounce(rechercherCommune, 300);
  }, [rechercherCommune]);

  useEffect(() => {
    return () => {
      debounceRechercheCommune.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSuggestionListEmpty = useCallback(() => {
    return !communeList.length;
  }, [communeList]);

  const handleClick = (commune: Commune) => {
    setLibelléCommune(commune.libelle);
    setCodeCommune(commune.code);
    setLatitudeCommune(commune.coordonnées.latitude.toString());
    setLongitudeCommune(commune.coordonnées.longitude.toString());
    setDistanceCommune(distanceCommune || DEFAULT_RADIUS_VALUE);
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
      if (!isSuggestionListEmpty() && ((codeCommune === '') || (libelléCommune && libelléCommune !== `${communeList[suggestionIndex].code}`))) {
        if (communeList) {
          setCodeCommune(communeList[suggestionIndex].code);
          setLatitudeCommune(communeList[suggestionIndex].coordonnées.latitude.toString());
          setLongitudeCommune(communeList[suggestionIndex].coordonnées.longitude.toString());
          setLibelléCommune(communeList[suggestionIndex].libelle);
          setDistanceCommune(distanceCommune || DEFAULT_RADIUS_VALUE);
        }
        setSuggestionsActive(false);
      }
    }
  };

  function SuggestionsCommuneList() {
    return (
      <ul
        className={styles.suggestionList}
        role="listbox"
        aria-labelledby={LOCALISATION_LABEL_ID}
        id={LOCALISATION_SUGGESTIONS_ID}
        data-testid="RésultatsCommune"
      >
        {communeList.length > 0 && communeList.map((suggestion, index) => (
          <li
            className={index === suggestionIndex ? styles.hover : ''}
            key={index}
            onClick={() => handleClick(suggestion)}
            role="option"
            aria-selected={libelléCommune === suggestion.libelle}
            value={suggestion.libelle}
          >
            {suggestion.libelle}
          </li>
        ))}
        {communeList.length === 0 &&
        <li className={styles.aucunRésultat} data-testid="CommuneNoResultMessage">
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
      <div className={styles.wrapper}>
        <label className="fr-label" htmlFor="rechercherCommune" id={LOCALISATION_LABEL_ID}>
          Localisation
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
              className={['fr-input', styles.libelleInput].join(' ')}
              value={libelléCommune}
              onChange={(event) => {
                setLibelléCommune(event.target.value);
                debounceRechercheCommune(event);
              }}
              onKeyDown={handleKeyDown}
              onClick={() => setSuggestionsActive(!!codeCommune)}
            />
            <input type="hidden" name="codeCommune" value={codeCommune} />
            <input type="hidden" name="latitudeCommune" value={latitudeCommune} />
            <input type="hidden" name="longitudeCommune" value={longitudeCommune} />
          </div>
          {suggestionsActive && <SuggestionsCommuneList/>}
        </div>
      </div>
      { codeCommune &&
      <Select
        label="Rayon"
        name="distanceCommune"
        placeholder={récupérerLibelléDepuisValeur(radiusList, distanceCommune)}
        optionList={radiusList}
        onChange={setDistanceCommune}
        value={distanceCommune}
        closeOnSelect={false}
      />
      }
    </>

  );
};
