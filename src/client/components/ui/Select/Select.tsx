import classNames from 'classnames';
import React, { ChangeEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Checkbox } from '~/client/components/ui/Checkbox/Checkbox';
import { AngleDownIcon } from '~/client/components/ui/Icon/angle-down.icon';
import { AngleUpIcon } from '~/client/components/ui/Icon/angle-up.icon';
import { Radio } from '~/client/components/ui/Radio/Radio';
import styles from '~/client/components/ui/Select/Select.module.scss';
import { KeyBoard } from '~/client/utils/keyboard.util';

interface SelectProps {
  placeholder: string
  optionList: Option[]
  value: string
  label: string
  name?: string
  multiple?: boolean

  onChange(value: string): void;
}

interface Option {
  libellé: string;
  valeur: string;
}

const MARGE_SELECT_WIDTH = 3;

export function Select(props: SelectProps) {
  const { optionList, onChange, value, placeholder, name, label, multiple } = props;
  const optionsRef = useRef<HTMLDivElement>(null);

  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  const closeOptionsOnClickOutside = useCallback((e: MouseEvent) => {
    if (!(optionsRef.current)?.contains(e.target as Node)) {
      setIsOptionsOpen(false);
    }
  }, []);

  const closeOptionsOnEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === KeyBoard.ESCAPE || KeyBoard.TAB) {
      setIsOptionsOpen(false);
    }
  }, []);

  const onSelectMultipleChange = useCallback((checkboxValue: boolean, changedValue: string) => {
    const currentString = value.split(',').filter((element) => element);
    const indexOfValue = currentString.indexOf(changedValue);
    if (!checkboxValue) {
      currentString.splice(indexOfValue, 1);
    } else {
      currentString.push(changedValue);
    }
    const newValue = currentString.join(',');
    onChange(newValue);
  }, [value]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === KeyBoard.ENTER) {
      event.preventDefault();
    }
  };

  useEffect(() => {
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

  return (
    <div>
      <label className={classNames(styles.selectLabel, 'fr-label')}>
        {label}
      </label>
      <div ref={optionsRef} className={styles.container}>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={isOptionsOpen}
          style={selectWidth}
          className={styles.button}
          onClick={() => setIsOptionsOpen(!isOptionsOpen)}
        >
          <span>{placeholder}</span>
          {isOptionsOpen ? <AngleUpIcon/> : <AngleDownIcon/>}
        </button>
        {isOptionsOpen &&
          <div
            className={styles.options}
            role={multiple ? 'listbox' : 'combobox'}
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
                    onChange={() => onSelectMultipleChange(option.valeur)}
                    onKeyDown={handleKeyDown}
                    checked={value.split(',').includes(option.valeur)}
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
                      onChange(e.target.value);
                    }}
                    onKeyDown={handleKeyDown}
                    checked={value === option.valeur}
                  />
                ))
            }
          </div>
        }
        <input type="hidden" name={name} value={value}/>
      </div>
    </div>
  );
}
