import classNames from 'classnames';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { ListBox } from '~/client/components/ui/Select/ListBox';
import styles from '~/client/components/ui/Select/Select.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface SelectProps {
  placeholder?: string
  optionList: Option[]
  value?: string
  label: string
  name?: string
  multiple?: boolean
  required?: boolean
  onChange?: (value: string) => void;
}

export interface Option {
  libellé: string;
  valeur: string;
}

export function Select({ optionList, onChange, value, placeholder, name, label, multiple, required }: SelectProps) {
  const optionsRef = useRef<HTMLDivElement>(null);

  const [isTouched, setIsTouched] = useState(false);
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const labelledBy = useRef(uuidv4());
  const errorMessageBy = useRef(uuidv4());

  const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
    if (!(optionsRef.current)?.contains(event.target as Node)) {
      setIsOptionsOpen(false);
    }
  }, []);

  const closeOptionsOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === KeyBoard.ESCAPE) {
      setIsOptionsOpen(false);
    }
  }, []);

  useEffect(function onValueChange() {
    setSelectedValue(value || '');
  }, [value]);

  useEffect(function setEventListenerOnMount() {
    document.addEventListener('mousedown', closeOptionsOnClickOutside);
    document.addEventListener('keyup', closeOptionsOnEscape);

    return () => {
      document.removeEventListener('mousedown', closeOptionsOnClickOutside);
      document.removeEventListener('keyup', closeOptionsOnEscape);
    };
  }, [closeOptionsOnClickOutside, closeOptionsOnEscape]);

  const buttonLabel = useMemo(() => {
    const getLibelléAvecValeur = optionList.find((option) => option.valeur === selectedValue);
    const defaultMultiplePlaceholder = placeholder ?? 'Sélectionnez vos choix';
    const defaultSinglePlaceholder = placeholder ?? 'Sélectionnez votre choix';
    const selectedValueLength = String(selectedValue).split(',').length;
    if (multiple) {
      if(!selectedValue) {
        return defaultMultiplePlaceholder;
      } else {
        return `${selectedValueLength} choix ${selectedValueLength > 1 ? 'sélectionnés' : 'sélectionné'}`;
      }
    }
    if (selectedValue) return getLibelléAvecValeur ? getLibelléAvecValeur.libellé : '';
    return defaultSinglePlaceholder;
  }, [multiple, placeholder, optionList, selectedValue]);

  const error = isTouched && !selectedValue ? 'Veuillez selectionner un choix' : undefined;

  return (
    <div className={styles.selectWrapper}>
      <label className={styles.selectLabel} id={labelledBy.current}>
        {label}
      </label>
      <div ref={optionsRef} className={styles.container}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-invalid={ !!error }
          aria-errormessage={ error && errorMessageBy.current }
          aria-expanded={isOptionsOpen}
          aria-labelledby={labelledBy.current}
          className={styles.button}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
          onBlur={() => required ? setIsTouched(true) : undefined}
        >
          <span className={classNames({ [styles.selectedLabel]:selectedValue })} data-testid='Select-Placeholder'>{buttonLabel}</span>
          {isOptionsOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </button>
        {isOptionsOpen &&
              <ListBox
                selectedValue={selectedValue}
                optionList={optionList}
                setSelectedValue={setSelectedValue}
                setIsOptionsOpen={setIsOptionsOpen}
                multiple={multiple ? true : false}
                onChange={onChange}
              />}
        <input type="hidden" name={name} value={selectedValue} data-testid='Select-InputHidden' />
        
      </div>
      {(error) && (
        <p className={classNames(styles.inputError)} id={errorMessageBy.current}>
          {error}
        </p>
      )}
    </div>
  );
}
