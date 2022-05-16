import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import styles from '~/client/components/ui/AutoCompletion/AutoCompletion.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';
import {
  Localisation,
  TypeLocalisation,
} from '~/server/localisations/domain/localisation';

interface AutoCompletionForLocalisationProps {
  régionList: Localisation[];
  départementList: Localisation[];
  communeList: Localisation[];
  inputName: string;
  inputLocalisation: string;
  onChange: (value: string) => void;
}

export const AutoCompletionForLocalisation = (props: AutoCompletionForLocalisationProps) => {
  const { régionList, départementList, communeList, inputName, onChange, inputLocalisation } = props;

  const [suggestionIndex, setSuggestionIndex] = useState(1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [codeInsee, setCodeInsee] = useState<string>('');
  const [typeLocalisation, setTypeLocalisation] = useState<TypeLocalisation | undefined>(undefined);

  const [currentHoverTypeLocalisation, setCurrentHoverTypeLocalisation]= useState(TypeLocalisation.REGION);
  const [currentIndex, setCurrenIndex] = useState(0);

  const autocompleteRef = useRef<HTMLDivElement>(null);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const closeSuggestionsOnClickOutside = useCallback((e) => {
    if (!(autocompleteRef.current)!.contains(e.target)) {
      if(codeInsee === '' && typeLocalisation === undefined) {
        setInputValue('');
      }
      setSuggestionsActive(false);
    }
  }, [autocompleteRef, codeInsee, typeLocalisation]);

  const closeSuggestionsOnEscape = useCallback((e) => {
    if (e.key === KeyBoard.ESCAPE) {
      if(codeInsee === '' && typeLocalisation === undefined) {
        setInputValue('');
        setSuggestionsActive(false);
      }
    }
  }, [codeInsee, typeLocalisation]);

  useEffect(() => {
    if (inputLocalisation) {
      setInputValue(inputLocalisation);
    }
    document.addEventListener('mousedown', closeSuggestionsOnClickOutside);
    document.addEventListener('keyup', closeSuggestionsOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeSuggestionsOnClickOutside);
      document.removeEventListener('keyup', closeSuggestionsOnEscape);
    };
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);
    setInputValue(value);
    setCodeInsee('');
    setTypeLocalisation(undefined);
    setSuggestionsActive(!!(value.length > 1));
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, typeLocalisation: TypeLocalisation) => {
    const { value } = e.currentTarget;
    const { innerText } = e.target as HTMLElement;
    setInputValue(innerText);
    setCodeInsee(String(value));
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
      let location;
      if (currentHoverTypeLocalisation === TypeLocalisation.DEPARTEMENT) {
        location = départementList;
      }
      else if (currentHoverTypeLocalisation === TypeLocalisation.REGION) {
        location = régionList;
      }
      else if (currentHoverTypeLocalisation === TypeLocalisation.COMMUNE) {
        location = communeList;
      }

      if((codeInsee === '' && typeLocalisation === undefined) || inputValue && inputValue !== `${location[currentIndex].libelle} (${location[currentIndex].code})`) {
        setTypeLocalisation(currentHoverTypeLocalisation);
        setCodeInsee(location[currentIndex].codeInsee);
        setInputValue(`${location[currentIndex].libelle} (${location[currentIndex].code})`);

        setSuggestionsActive(false);
      }
      else if (inputValue) {
        setSuggestionsActive(true);
      }
    }
  };

  const getSuggestion = (suggestion, currentHoverIndex, typeLocalisation, index) => {
    if (currentHoverIndex === suggestionIndex) {
      setCurrentHoverTypeLocalisation(typeLocalisation);
      setCurrenIndex(index);
    }
    const { libelle, code, codeInsee } = suggestion;

    return (
      <li
        className={inputValue === `${libelle} (${code})` ? styles.active : currentHoverIndex === suggestionIndex ? styles.active : ''}
        key={currentHoverIndex}
        onClick={(e) => handleClick(e, typeLocalisation)}
        role="option"
        aria-selected={inputValue === `${libelle} (${code})`}
        value={codeInsee}
      >
        {libelle} ({code})
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
        data-testid="ResultsContainer"
      >
        { (régionList.length > 0) && <li className={styles.localisationCatégorie}><strong>Régions</strong></li>}
        {régionList.map((suggestion, index) => {
          currentHoverIndex++;
          return getSuggestion(suggestion, currentHoverIndex, TypeLocalisation.REGION, index);
        })}

        { (départementList.length > 0) && <li className={styles.localisationCatégorie}><strong>Départements</strong></li>}
        {départementList.map((suggestion, index) => {
          currentHoverIndex++;
          return getSuggestion(suggestion, currentHoverIndex, TypeLocalisation.DEPARTEMENT, index);
        })}

        {(communeList.length > 0) && <li className={styles.localisationCatégorie}><strong>Communes</strong></li>}
        {communeList.map((suggestion, index) => {
          currentHoverIndex++;
          return getSuggestion(suggestion, currentHoverIndex, TypeLocalisation.COMMUNE, index);
        })}
      </ul>
    );
  };

  return (
    <div>
      <label className={'fr-label'} htmlFor={inputName} id={label}>
        Localisation
      </label>
      <div ref={autocompleteRef}>
        <div
          className='fr-search-bar'
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
            className="fr-input"
            value={inputValue}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onClick={() => setSuggestionsActive(!!codeInsee)}
          />
          <input type="hidden" data-testid="TypeLocalisation" name="typeLocalisation" value={typeLocalisation}/>
          <input type="hidden" data-testid="ValueLocalisation" name="codeInsee" value={codeInsee}/>
        </div>
        {suggestionsActive && <Suggestions />}
      </div>
    </div>
  );
};
