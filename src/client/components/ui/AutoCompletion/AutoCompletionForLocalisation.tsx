import React, { ChangeEvent, useState } from 'react';

import styles from '~/client/components/ui/AutoCompletion/AutoCompletion.module.css';
import { KeyBoard } from '~/client/utils/keyboard.util';
import { Localisation, TypeLocalisation } from '~/server/localisations/domain/localisation';

interface AutoCompletionForLocalisationProps {
  régionList: Localisation[];
  départementList: Localisation[];
  communeList: Localisation[];
  inputName: string;
  onChange: (toto: string) => void;
}

export const AutoCompletionForLocalisation = (props: AutoCompletionForLocalisationProps) => {
  const { régionList, départementList, communeList, inputName, onChange } = props;

  const [suggestionIndex, setSuggestionIndex] = useState(1);
  const [suggestionsActive, setSuggestionsActive] = useState(false);
  const [value, setValue] = useState('');
  const [codeInsee, setCodeInsee] = useState<string>('');
  const [typeLocalisation, setTypeLocalisation] = useState<TypeLocalisation | undefined>(undefined);

  const label = 'autocomplete-label';
  const listbox = 'autocomplete-listbox';

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange(value);
    setValue(value);
    setCodeInsee('');
    setTypeLocalisation(undefined);

    if (value.length > 1) {
      setSuggestionsActive(true);
    } else {
      setSuggestionsActive(false);
    }
  };

  const handleBlur = () => {
    if(codeInsee === '' && typeLocalisation === undefined) {
      setValue('');
      setSuggestionsActive(false);
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLLIElement>, typeLocalisation: TypeLocalisation) => {
    const { value } = e.currentTarget;
    const { innerText } = e.target as HTMLElement;
    setValue(innerText);
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
      setSuggestionsActive(false);
    }
  };

  const Suggestions = () => {
    let currentHoverIndex = 0;
    return (
      <ul
        className={styles.autocompletionSuggestion}
        role="listbox"
        aria-labelledby={label}
        id={listbox}
      >
        <li className={styles.localisationCatégorie}><strong>Régions</strong></li>
        {régionList.map((suggestion) => {
          currentHoverIndex++;
          return (
            <li
              data-list="région"
              className={currentHoverIndex === suggestionIndex ? styles.active : ''}
              key={currentHoverIndex}
              onClick={(e) => handleClick(e, TypeLocalisation.REGION)}
              role="option"
              aria-selected={false}
              value={suggestion.codeInsee}
            >
              {suggestion.libelle} ({suggestion.code})
            </li>
          );
        })}

        <li className={styles.localisationCatégorie}><strong>Départements</strong></li>
        {départementList.map((suggestion) => {
          currentHoverIndex++;
          return (
            <li
              className={currentHoverIndex === suggestionIndex ? styles.active : ''}
              key={currentHoverIndex}
              onClick={(e) => handleClick(e, TypeLocalisation.DEPARTEMENT)}
              role="option"
              aria-selected={false}
              value={suggestion.codeInsee}
            >
              {suggestion.libelle} ({suggestion.code})
            </li>
          );
        })}

        <li className={styles.localisationCatégorie}><strong>Communes</strong></li>
        {communeList.map((suggestion) => {
          currentHoverIndex++;
          return (
            <li
              className={currentHoverIndex === suggestionIndex ? styles.active : ''}
              key={currentHoverIndex}
              onClick={(e) => handleClick(e, TypeLocalisation.COMMUNE)}
              role="option"
              aria-selected={false}
              value={suggestion.codeInsee}
            >
              {suggestion.libelle} ({suggestion.code})
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div>
      <div>
        <label className={'fr-label'} htmlFor={inputName} id={label}>
          Localisation
        </label>
        <div>
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
              autoComplete="off"
              aria-autocomplete="list"
              aria-controls={listbox}
              aria-activedescendant={inputName}
              placeholder={'Exemple: Paris, Béziers...'}
              className="fr-input"
              value={value}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              onBlur={handleBlur}
            />
            <input type="hidden" name="typeLocalisation" value={typeLocalisation}/>
            <input type="hidden" name="codeInsee" value={codeInsee}/>
          </div>
          {suggestionsActive && <Suggestions />}
        </div>
      </div>

    </div>
  );
};
