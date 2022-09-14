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
  const [isOptionListOpen, setIsOptionListOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const labelledBy = useRef(uuidv4());
  const errorMessageBy = useRef(uuidv4());

  const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
    if (!(optionsRef.current)?.contains(event.target as Node)) {
      setIsOptionListOpen(false);
    }
  }, []);

  const closeOptionsOnEscape = useCallback((event: KeyboardEvent) => {
    const currentItem = event.target as HTMLElement;
    if (event.code === KeyBoard.ESCAPE) {
      setIsOptionListOpen(false);
      if (currentItem.parentElement !== null && currentItem.parentElement.parentElement !== null) {
        currentItem.parentElement.parentElement.getElementsByTagName('button')[0].focus();
      }
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
      return !selectedValue
        ? defaultMultiplePlaceholder
        : `${selectedValueLength} choix ${selectedValueLength > 1 ? 'sélectionnés' : 'sélectionné'}`;
    }
    if (selectedValue) return getLibelléAvecValeur ? getLibelléAvecValeur.libellé : '';
    return defaultSinglePlaceholder;
  }, [multiple, placeholder, optionList, selectedValue]);

  const error = isTouched && !selectedValue ? 'Veuillez selectionner un choix' : undefined;

  useEffect(function setFocus() {
    if (isOptionListOpen) {
      const currentItem = optionsRef.current as HTMLDivElement;
      const firstElement = currentItem.getElementsByTagName('li')[0];
      firstElement.focus();
    }
  }, [isOptionListOpen]);

  return (
    <div className={styles.selectWrapper}>
      <label className={styles.selectLabel} id={labelledBy.current}>
        {label}
      </label>
      <div ref={optionsRef} className={styles.container}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionListOpen}
          aria-labelledby={labelledBy.current}
          className={styles.button}
          onClick={() => { setIsOptionListOpen(!isOptionListOpen); }}
          onBlur={() => required ? setIsTouched(true) : undefined}
        >
          <span className={classNames({ [styles.selectedLabel]:selectedValue })} data-testid='Select-Placeholder'>{buttonLabel}</span>
          {isOptionListOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </button>
        {isOptionListOpen &&
              <ListBox
                selectedValue={selectedValue}
                optionList={optionList}
                setSelectedValue={setSelectedValue}
                setIsOptionListOpen={setIsOptionListOpen}
                aria-invalid={ !!error }
                aria-errormessage={ error && errorMessageBy.current }
                multiple={multiple || false}
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
