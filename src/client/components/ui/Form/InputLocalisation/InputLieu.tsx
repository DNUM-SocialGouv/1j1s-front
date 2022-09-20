import classNames from 'classnames';
import debounce from 'lodash/debounce';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { KeyBoard } from '~/client/components/keyboard/keyboard.enum';
import styles from '~/client/components/ui/Form/Input.module.scss';
import { useDependency } from '~/client/context/dependenciesContainer.context';
import { LocalisationService } from '~/client/services/localisation.service';
import { TypeLocalisation } from '~/server/localisations/domain/localisation';
import {
  LocalisationApiResponse,
  RechercheLocalisationApiResponse,
} from '~/server/localisations/infra/controllers/RechercheLocalisationApiResponse';

interface InputLieuProps {
  code: string;
  libellé: string;
  type: string;
  label: string;
  name: string;
  obligatoire: boolean;
  onChange: (location: LocalisationApiResponse) => void;
}

export const InputLieu = (props: InputLieuProps) => {
  const { code, libellé, type, label, name, obligatoire, onChange } = props;
  const LOCALISATION_LABEL_ID = 'autocomplete-label';
  const LOCALISATION_SUGGESTIONS_ID = 'autocomplete-list-box';

  const localisationService = useDependency<LocalisationService>('localisationService');

  const [suggestionIndex, setSuggestionIndex] = useState(1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [libelléLocalisation, setLibelléLocalisation] = useState<string>(libellé || '');
  const [codeLocalisation, setCodeLocalisation] = useState<string>(code || '');
  const [typeLocalisation, setTypeLocalisation] = useState<TypeLocalisation | string>(type || '');
  const [currentHoverTypeLocalisation, setCurrentHoverTypeLocalisation] = useState(TypeLocalisation.REGION);
  const [currentIndex, setCurrenIndex] = useState(0);
  const [localisationList, setLocalisationList] = useState<RechercheLocalisationApiResponse>({
    communeList: [],
    départementList: [],
    régionList: [],
  });

  const [error, setError] = useState(false);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const clearLocalisation = useCallback(() => {
    setCodeLocalisation('');
    setLibelléLocalisation('');
    setTypeLocalisation('');
  }, []);

  const cancelLocalisationSelect = useCallback(() => {
    if (codeLocalisation === '' && typeLocalisation === '') {
      clearLocalisation();
    }
    setSuggestionsActive(false);
  }, [codeLocalisation, typeLocalisation, clearLocalisation]);

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

  useEffect(() => {
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  }, [closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  useEffect(() => {
    if (libelléLocalisation === '') {
      clearLocalisation();
    }
  }, [libelléLocalisation, codeLocalisation, typeLocalisation, clearLocalisation]);

  useEffect(() => {
    if (libellé === '' || type === '' || code === '') {
      clearLocalisation();
    } else {
      setCodeLocalisation(code);
      setLibelléLocalisation(libellé);
      setTypeLocalisation(type);
    }
  }, [libellé, type, code, clearLocalisation]);

  const rechercherLocalisation = useCallback(async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const résultats = await localisationService.rechercherLocalisation(value);
    setLocalisationList(résultats ?? { communeList: [], départementList: [], régionList: [] });
    setCodeLocalisation('');
    setTypeLocalisation('');
    setSuggestionsActive(value.length > 1);
    setSuggestionIndex(1);
  }, [localisationService]);

  const handleChange = useMemo(() => {
    return debounce(rechercherLocalisation, 300);
  }, [rechercherLocalisation]);

  useEffect(() => {
    return () => {
      handleChange.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isSuggestionListEmpty = useCallback(() => {
    return !localisationList.départementList.length && !localisationList.régionList.length && !localisationList.communeList.length;
  }, [localisationList]);

  const choisirUneSuggestion = (localisation: LocalisationApiResponse, typeLocalisation: string) => {
    setLibelléLocalisation(localisation.libelle);
    setCodeLocalisation(localisation.code);
    setTypeLocalisation(typeLocalisation);
    setSuggestionsActive(false);
    onChange(localisation);
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

      let localisation: LocalisationApiResponse[] = [];
      if (!isSuggestionListEmpty()) {
        if (currentHoverTypeLocalisation === TypeLocalisation.DEPARTEMENT && localisationList.départementList) {
          localisation = localisationList.départementList;
        } else if (currentHoverTypeLocalisation === TypeLocalisation.REGION && localisationList.régionList) {
          localisation = localisationList.régionList;
        } else if (currentHoverTypeLocalisation === TypeLocalisation.COMMUNE && localisationList.communeList) {
          localisation = localisationList.communeList;
        }
      }
      if (!isSuggestionListEmpty() && ((codeLocalisation === '' && typeLocalisation === '') || (libelléLocalisation && libelléLocalisation !== `${localisation[currentIndex].code}`))) {
        setTypeLocalisation(currentHoverTypeLocalisation);
        if (localisation) {
          setCodeLocalisation(localisation[currentIndex].code);
          setLibelléLocalisation(localisation[currentIndex].libelle);
        }
        setSuggestionsActive(false);
      }
    }
  };

  const SuggestionLocalisationListItem = (suggestion: LocalisationApiResponse, currentHoverIndex: number, typeLocalisation: TypeLocalisation, index: number) => {
    if (currentHoverIndex === suggestionIndex) {
      setTimeout(() => setCurrentHoverTypeLocalisation(typeLocalisation), 0);
      setTimeout(() => setCurrenIndex(index), 0);
    }

    return (
      <li
        className={currentHoverIndex === suggestionIndex ? styles.hover : ''}
        key={currentHoverIndex}
        onClick={(event) => {
          choisirUneSuggestion(suggestion, typeLocalisation);
          event.stopPropagation();
          event.preventDefault();
        }}
        role="option"
        aria-selected={libelléLocalisation === suggestion.libelle}
        value={suggestion.libelle}
        data-testid="RésultatLocalisationItem"
      >
        {suggestion.libelle}
      </li>
    );
  };

  function SuggestionsLocalisationList() {
    let currentHoverIndex = 0;
    return (
      <ul
        className={styles.suggestionList}
        role="listbox"
        aria-labelledby={LOCALISATION_LABEL_ID}
        id={LOCALISATION_SUGGESTIONS_ID}
        data-testid="RésultatsLocalisation"
      >
        {localisationList.régionList.length > 0 &&
          <li className={styles.catégorieRésultat}><strong>Régions</strong></li>}
        {localisationList.régionList.map((suggestion, index) => {
          currentHoverIndex++;
          return SuggestionLocalisationListItem(suggestion, currentHoverIndex, TypeLocalisation.REGION, index);
        })}

        {localisationList.départementList.length > 0 &&
          <li className={styles.catégorieRésultat}><strong>Départements</strong></li>}
        {localisationList.départementList.map((suggestion, index) => {
          currentHoverIndex++;
          return SuggestionLocalisationListItem(suggestion, currentHoverIndex, TypeLocalisation.DEPARTEMENT, index);
        })}

        {localisationList.communeList.length > 0 &&
          <li className={styles.catégorieRésultat}><strong>Communes</strong></li>}
        {localisationList.communeList.map((suggestion, index) => {
          currentHoverIndex++;
          return SuggestionLocalisationListItem(suggestion, currentHoverIndex, TypeLocalisation.COMMUNE, index);
        })}
        {isSuggestionListEmpty() &&
          <li className={styles.aucunRésultat} data-testid="LocalisationNoResultMessage">
            Aucune proposition ne correspond à votre saisie.
            Vérifiez que votre saisie correspond bien à un lieu.
            Exemple : Paris, ...
          </li>
        }
      </ul>
    );
  }

  const validateInput = () => {
    if (obligatoire && autocompleteRef.current) {
      const isEmpty = !autocompleteRef.current.textContent;
      setError(isEmpty);
    }
  };

  return (
    <div className={styles.wrapper}>
      <label htmlFor="rechercherLocalisation" id={LOCALISATION_LABEL_ID}>
        {label}
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
            id="rechercherLocalisation"
            name={name}
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={LOCALISATION_SUGGESTIONS_ID}
            aria-activedescendant="rechercherLocalisation"
            placeholder={'Exemple: Paris, Béziers...'}
            className={classNames(styles.formControlInput, error && styles.formControlInputError)}
            value={libelléLocalisation}
            onChange={(event) => {
              setLibelléLocalisation(event.target.value);
              handleChange(event);
            }}
            onBlur={validateInput}
            onKeyDown={handleKeyDown}
            onClick={() => setSuggestionsActive(!!codeLocalisation)}
            required={obligatoire}
          />
          {error && <div className={styles.formControlInputHint}>Veuillez renseigner ce champ</div>}
          <input type="hidden" name="typeLocalisation" value={typeLocalisation} data-testid="typeLocalisation"/>
          <input type="hidden" name="codeLocalisation" value={codeLocalisation} data-testid="codeLocalisation"/>
        </div>
        {suggestionsActive && <SuggestionsLocalisationList/>}
      </div>
    </div>
  );
};

InputLieu.defaultProps = {
  obligatoire: false,
  onChange: () => undefined,
};
