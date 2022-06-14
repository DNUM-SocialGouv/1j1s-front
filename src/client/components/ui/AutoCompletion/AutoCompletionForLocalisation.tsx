import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';

import styles from '~/client/components/ui/AutoCompletion/AutoCompletion.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { Localisation, TypeLocalisation } from '~/server/localisations/domain/localisation';

interface AutoCompletionForLocalisationProps {
  régionList?: Localisation[];
  départementList?: Localisation[];
  communeList: Localisation[];
  inputName: string;
  inputLocalisation: string;
  onChange: (value: string) => void;
  onUpdateInputLocalisation: () => void;
}

export const AutoCompletionForLocalisation = (props: AutoCompletionForLocalisationProps) => {
  const { régionList, départementList, communeList, inputName, onChange, inputLocalisation, onUpdateInputLocalisation } = props;

  const [suggestionIndex, setSuggestionIndex] = useState(1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [codeInsee, setCodeInsee] = useState<string>('');
  const [typeLocalisation, setTypeLocalisation] = useState<TypeLocalisation | string>('');

  const [currentHoverTypeLocalisation, setCurrentHoverTypeLocalisation]= useState(TypeLocalisation.REGION);
  const [currentIndex, setCurrenIndex] = useState(0);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const closeSuggestionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(autocompleteRef.current)?.contains(e.target as Node)) {
      if(codeInsee === '' && typeLocalisation === '') {
        setInputValue('');
      }
      setSuggestionsActive(false);
    }
  }, [autocompleteRef, codeInsee, typeLocalisation]);

  const closeSuggestionsOnKeyUp = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || e.key === KeyBoard.TAB) {
      if(codeInsee === '' && typeLocalisation === '') {
        setInputValue('');
        setSuggestionsActive(false);
      }
    }
  }, [codeInsee, typeLocalisation]);

  useEffect(() => {
    if (inputLocalisation !== '') {
      setInputValue(inputLocalisation);
    }
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnKeyUp);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnKeyUp);
    };
  },[inputLocalisation, closeSuggestionsOnClickOutside, closeSuggestionsOnKeyUp]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);
    setInputValue(value);
    setCodeInsee('');
    setTypeLocalisation('');
    setSuggestionsActive(value.length > 1);
  };

  const handleClick = (innerText: string, typeLocalisation: TypeLocalisation, codeInsee: string) => {
    onUpdateInputLocalisation();
    setInputValue(innerText);
    setCodeInsee(codeInsee);
    setTypeLocalisation(typeLocalisation);
    setSuggestionsActive(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ARROW_UP) {
      if (suggestionIndex === 0) {
        return;
      }
      setSuggestionIndex(suggestionIndex - 1);
    }
    else if (event.key === KeyBoard.ARROW_DOWN) {
      setSuggestionIndex(suggestionIndex + 1);
    }
    else if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
      const isSuggestionListEmpty = (départementList && départementList.length === 0) && (régionList && régionList.length === 0) && communeList.length === 0;
      let location: Localisation[] | undefined = [];
      if (!isSuggestionListEmpty) {

        if (currentHoverTypeLocalisation === TypeLocalisation.DEPARTEMENT) {
          location = départementList;
        }
        else if (currentHoverTypeLocalisation === TypeLocalisation.REGION) {
          location = régionList;
        }
        else if (currentHoverTypeLocalisation === TypeLocalisation.COMMUNE) {
          location = communeList;
        }
      }
      if(!isSuggestionListEmpty && ((codeInsee === '' && typeLocalisation === '') || (inputValue && inputValue !== `${!(location) || location[currentIndex].code}`))) {
        onUpdateInputLocalisation();
        setTypeLocalisation(currentHoverTypeLocalisation);
        if (location) {
          setCodeInsee(location[currentIndex].codeInsee.value);
          setInputValue(`${location[currentIndex].libelle} (${location[currentIndex].code})`);
        }
        setSuggestionsActive(false);
      }
    }
  };

  const getSuggestion = (suggestion: Localisation, currentHoverIndex: number, typeLocalisation: TypeLocalisation, index: number) => {
    if (currentHoverIndex === suggestionIndex) {
      setTimeout(() => setCurrentHoverTypeLocalisation(typeLocalisation), 0);
      setTimeout(() => setCurrenIndex(index), 0);
    }

    const { libelle, code, codeInsee } = suggestion;
    const innerText = `${libelle} (${code})`;

    return (
      <li
        className={inputValue === `${libelle} (${code})` ? styles.active : currentHoverIndex === suggestionIndex ? styles.active : ''}
        key={currentHoverIndex}
        onClick={() => handleClick(innerText, typeLocalisation, codeInsee.value)}
        role="option"
        aria-selected={inputValue === `${libelle} (${code})`}
        value={codeInsee.value}
        data-testid="RésultatLocalisationItem"
      >
        {innerText}
      </li>
    );
  };

  const Suggestions = () => {
    let currentHoverIndex = 0;
    return (
      <ul
        className={styles.autocompletionSuggestion}
        role="listbox"
        aria-labelledby={label}
        id={listbox}
        data-testid="RésultatsLocalisation"
      >
        {(régionList && régionList.length > 0) && <li className={styles.localisationCatégorie}><strong>Régions</strong></li>}
        {régionList && régionList.map((suggestion, index) => {
          currentHoverIndex++;
          return getSuggestion(suggestion, currentHoverIndex, TypeLocalisation.REGION, index);
        })}

        {(départementList && départementList.length > 0) && <li className={styles.localisationCatégorie}><strong>Départements</strong></li>}
        {départementList && départementList.map((suggestion, index) => {
          currentHoverIndex++;
          return getSuggestion(suggestion, currentHoverIndex, TypeLocalisation.DEPARTEMENT, index);
        })}

        {(communeList.length > 0) && <li className={styles.localisationCatégorie}><strong>Communes</strong></li>}
        {communeList.map((suggestion, index) => {
          currentHoverIndex++;
          return getSuggestion(suggestion, currentHoverIndex, TypeLocalisation.COMMUNE, index);
        })}
        {(régionList && régionList.length === 0 && départementList && départementList.length === 0 && communeList.length === 0) &&
          <li className={styles.noSuggestion} data-testid="LocalisationNoResultMessage">
            Aucune proposition ne correspond à votre saisie.
            Vérifiez que votre saisie correspond bien à un lieu.
            Exemple : Paris, ...
          </li>
        }
      </ul>
    );
  };

  return (
    <div className={styles.wrapper}>
      <label className={'fr-label'} htmlFor={inputName} id={label}>
        Localisation
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
            data-testid="InputLocalisation"
            autoComplete="off"
            aria-autocomplete="list"
            aria-controls={listbox}
            aria-activedescendant={inputName}
            placeholder={'Exemple: Paris, Béziers...'}
            className={['fr-input', styles.autocompletionInput].join(' ')}
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={() => setSuggestionsActive(!!codeInsee)}
          />
          <input type="hidden" name="typeLocalisation" value={typeLocalisation}/>
          <input type="hidden" name="codeInsee" value={codeInsee}/>
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
