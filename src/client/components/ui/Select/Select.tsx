import { uuid4 } from '@sentry/utils';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import styles from '~/client/components/ui/Select/Select.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface SelectProps {
  placeholder?: string
  optionList: Option[]
  value?: string
  label: string
  name?: string
  multiple?: boolean
  onChange?: (value: string) => void;
}

export interface Option {
  libellé: string;
  valeur: string;
}

const MARGE_SELECT_WIDTH = 3;

export function Select(props: SelectProps) {
  const { optionList, onChange, value, placeholder, name, label, multiple } = props;
  const optionsRef = useRef<HTMLDivElement>(null);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const labeledBy = useRef(uuid4());

  const closeOptionsOnClickOutside = useCallback((event: MouseEvent) => {
    if (!(optionsRef.current)?.contains(event.target as Node)) {
      setIsOptionsOpen(false);
    }
  }, []);

  const closeOptionsOnEscape = useCallback((event: KeyboardEvent) => {
    if (event.key === KeyBoard.ESCAPE || KeyBoard.TAB) {
      setIsOptionsOpen(false);
    }
  }, []);

  const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  }, []);

  const onSelectMultipleChange = useCallback((isValueSelected: boolean, changedValue: string) => {
    const valueList = selectedValue ? selectedValue.split(',') : [];
    if (isValueSelected) {
      valueList.push(changedValue);
    } else {
      const indexOfValue = valueList.indexOf(changedValue);
      valueList.splice(indexOfValue, 1);
    }

    const newSelectedValue = valueList.join(',');
    setSelectedValue(newSelectedValue);
    if (onChange) {
      onChange(newSelectedValue);
    }
  }, [selectedValue, onChange]);

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

  const selectWidth = useMemo(() => {
    const optionLengthList = optionList.map((option) => option.libellé.length);
    const maxOptionLength = Math.max(...optionLengthList);
    return maxOptionLength ? { minWidth: `${maxOptionLength + MARGE_SELECT_WIDTH}ch` } : {};
  }, [optionList]);

  const buttonLabel = useMemo(() => {

    const getLibelléAvecValeur = optionList.find((option) => option.valeur === value);
    const checkLibelléValeurs = getLibelléAvecValeur ? getLibelléAvecValeur.libellé : '';
    const defaultMultiplePlaceholder = placeholder ? placeholder : 'Sélectionnez vos choix';
    const defaultSinglePlaceholder = placeholder ? placeholder : 'Sélectionnez votre choix';

    if (multiple) {
      if(!selectedValue) {
        return defaultMultiplePlaceholder;
      } else {
        return `${defaultMultiplePlaceholder}... (${selectedValue.split(',').length})`;
      }
    }
    if (selectedValue) return checkLibelléValeurs;
    return defaultSinglePlaceholder;
  }, [selectedValue, multiple, placeholder, optionList, value]);

  function ListBox() {
    return (
      <div
        className={styles.options}
        role="listbox"
      >
        {
          multiple
            ? optionList.map((option, index) => (
              <Checkbox
                key={index}
                className={styles.option}
                role="option"
                label={option.libellé}
                value={option.valeur}
                onChange={(event: ChangeEvent<HTMLInputElement>) => onSelectMultipleChange(event.target.checked, option.valeur)}
                onKeyDown={handleKeyDown}
                checked={selectedValue.split(',').includes(option.valeur)}
              />
            ))
            : optionList.map((option, index) => (
              <Radio
                id={option.libellé}
                key={index}
                className={styles.option}
                role="option"
                label={option.libellé}
                value={option.valeur}
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  const { value } = e.target;
                  setSelectedValue(value);
                  if(onChange) {
                    onChange(e.target.value);
                  }
                }}
                onKeyDown={handleKeyDown}
                checked={selectedValue === option.valeur}
              />
            ))
        }
      </div>
    );
  }

  return (
    <div>
      <label className={styles.selectLabel} id={labeledBy.current}>
        {label}
      </label>
      <div ref={optionsRef} className={styles.container}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          aria-labelledby={labeledBy.current}
          style={selectWidth}
          className={styles.button}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <span>{buttonLabel}</span>
          {isOptionsOpen ? <AngleUpIcon /> : <AngleDownIcon />}
        </button>
        {isOptionsOpen && <ListBox />}
        <input type="hidden" name={name} value={selectedValue}/>
      </div>
    </div>
  );
}
